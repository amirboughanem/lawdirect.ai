import supabase from '../config/database.js';
import { LAWYER_IMAGE_BUCKET } from '../config/constants.js';

export const fetchLawyerImage = async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;
    const imageFileName = `${lawyerId}.png`;

    let { data, error } = await supabase.storage.from(LAWYER_IMAGE_BUCKET).list();

    if (!doesImageExist(data, imageFileName)) {
      return res.status(404).json({ message: `Image for lawyer with ID ${lawyerId} not found.` });
    }

    ({ data, error } = await supabase.storage.from(LAWYER_IMAGE_BUCKET).getPublicUrl(imageFileName));

    if (error) {
      return res.status(404).json({ message: `Error while fetching image URL for lawyer with ID ${lawyerId}.` });
    }

    return res
      .status(200)
      .json({ imageUrl: data.publicUrl, message: `Image URL for lawyer with ID ${lawyerId} returned.` });
  } catch (error) {
    console.error(`Error fetching lawyer: `, error);

    res.status(500).json({ error });
  }
};

const doesImageExist = (bucketFiles, imageFileName) => {
  return bucketFiles.some((file) => file.name === imageFileName);
};
