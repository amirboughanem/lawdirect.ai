import supabase from '../config/database.js';
import { LAWYER_TABLE } from '../config/constants.js';
import generateBio from '../utils/bioGenerator.js';
import generateEmbedding from '../utils/embeddingGenerator.js';

export const fetchLawyer = async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;

    if (!isLawyerIdValid(lawyerId)) {
      return res.status(400).json({ message: `Lawyer ID ${lawyerId} is invalid for this request.` });
    }

    const lawyer = await getLawyer(lawyerId);

    if (!lawyer) {
      return res.status(404).json({ message: `Lawyer with ID ${lawyerId} not found.` });
    }

    res.status(200).json({ lawyer, message: `Lawyer with ID ${lawyerId} returned.` });
  } catch (error) {
    console.error(`[LAWYER] [CONTROLLER] ERROR FETCHING LAWYER: `, error);

    return res.status(500).json({ message: error.message });
  }
};

const isLawyerIdValid = (id) => {
  const num = Number(id);
  return Number.isInteger(num) && num > 0;
};

const getLawyer = async (id) => {
  const { data, error } = await supabase
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
    .eq('lawyer_id', id)
    .maybeSingle();

  if (error) {
    if (error.code === 'PGRST116') {
      // no rows found
      return null;
    }

    throw error;
  }

  return data;
};

export const createLawyer = async (req, res) => {
  try {
    const {
      name,
      years_of_experience,
      education,
      rating,
      hourly_rate,
      reviews_count,
      email,
      phone_number,
      governorate,
      gender,
      specialties,
      jurisdictions,
      languages,
    } = req.body;

    const { data, error } = await supabase
      .schema(process.env.SUPABASE_SCHEMA)
      .rpc('create_lawyer_full', {
        p_name: name,
        p_years_of_experience: years_of_experience,
        p_education: education,
        p_rating: rating,
        p_hourly_rate: hourly_rate,
        p_reviews_count: reviews_count,
        p_email: email,
        p_phone_number: phone_number,
        p_governorate: governorate,
        p_gender: gender,
        p_specialties: specialties,
        p_jurisdictions: jurisdictions,
        p_languages: languages,
      });

    if (error) {
      return res.status(400).json({ message: 'Failed to create lawyer', error: error.message });
    }

    const bio = generateBio(governorate, years_of_experience, specialties, jurisdictions, languages, gender);
    const embedding = await generateEmbedding(bio);
    await updateLawyerBio(data.lawyer_id, bio);
    await updateLawyerEmbedding(data.lawyer_id, embedding);
    return res.status(201).json({ message: 'Lawyer created successfully', lawyer_id: data.lawyer_id });
  } catch (err) {
    console.error(`[LAWYER] [CONTROLLER] ERROR INSERTING LAWYER: `, err);

    return res.status(500).json({ message: err.message });
  }
};

const updateLawyerBio = async (lawyerId, bio) => {
  const { error } = await supabase
    .schema(process.env.SUPABASE_SCHEMA)
    .from(LAWYER_TABLE)
    .update({ bio })
    .eq('lawyer_id', lawyerId);

  if (error) {
    throw error;
  }
};

const updateLawyerEmbedding = async (lawyerId, embedding) => {
  const { error } = await supabase
    .schema(process.env.SUPABASE_SCHEMA)
    .from(LAWYER_TABLE)
    .update({ embedding })
    .eq('lawyer_id', lawyerId);

  if (error) {
    throw error;
  }
};
