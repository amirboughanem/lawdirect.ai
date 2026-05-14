import supabase from '../config/database.js';
import { LAWYER_ID, LAWYER_TABLE } from '../config/constants.js';

export const fetchLawyerImage = async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;
    const imageFileName = `${lawyerId}.png`;

    let { data } = await supabase.storage.from(process.env.LAWYER_SUPABASE_IMAGE_BUCKET).list();

    if (!doesImageExist(data, imageFileName)) {
      return res.status(404).json({ message: `Image for lawyer with ID ${lawyerId} not found.` });
    }

    ({ data } = await supabase.storage.from(process.env.LAWYER_SUPABASE_IMAGE_BUCKET).getPublicUrl(imageFileName));

    return res
      .status(200)
      .json({ image_url: data.publicUrl, message: `Image URL for lawyer with ID ${lawyerId} returned.` });
  } catch (err) {
    console.error(`[ADMIN] [CONTROLLER] ERROR FETCHING LAWYER IMAGE: `, err);
    return res.status(500).json({ message: err.message });
  }
};

const doesImageExist = (bucketFiles, imageFileName) => {
  return bucketFiles.some((file) => file.name === imageFileName);
};

export const uploadLawyerImage = async (req, res) => {
  try {
    const { lawyerId } = req.params;
    const file = req.file;
    const fileExtension = 'png';

    let { data, error } = await supabase
      .schema(process.env.SUPABASE_SCHEMA)
      .from(LAWYER_TABLE)
      .select(
        `
			lawyer_id,
			name,
			years_of_experience,
			image_url,
			rating,
			hourly_rate,
			reviews_count,
			gender
			`,
      )
      .eq(LAWYER_ID, lawyerId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ message: `Invalid lawyer ID ${lawyerId}.` });
      }

      throw error;
    }

    if (!file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    if (!isFileTypeSupported(file.mimetype)) {
      return res.status(400).json({ message: 'Invalid image type.' });
    }

    const imageFileName = `${lawyerId}.${fileExtension}`;

    ({ error } = await supabase.storage
      .from(process.env.LAWYER_SUPABASE_IMAGE_BUCKET)
      .upload(imageFileName, file.buffer, { contentType: file.mimetype, upsert: true }));

    if (error) {
      throw new Error('Failed to upload lawyer image.');
    }

    ({ data } = supabase.storage.from(process.env.LAWYER_SUPABASE_IMAGE_BUCKET).getPublicUrl(imageFileName));

    const imageUrl = data.publicUrl;

    ({ error } = await supabase
      .schema(process.env.SUPABASE_SCHEMA)
      .from(LAWYER_TABLE)
      .update({ image_url: imageUrl })
      .eq(LAWYER_ID, lawyerId));

    if (error) {
      throw error;
    }

    return res.status(201).json({ image_url: imageUrl, message: `Image URL for lawyer with ID ${lawyerId} returned.` });
  } catch (err) {
    console.error(`[ADMIN] [CONTROLLER] ERROR UPLOADING LAWYER IMAGE: `, err);
    return res.status(500).json({ message: err.message });
  }
};

const isFileTypeSupported = (fileMimeType) => {
  const allowedFileTypes = ['image/png'];

  return allowedFileTypes.includes(fileMimeType);
};
