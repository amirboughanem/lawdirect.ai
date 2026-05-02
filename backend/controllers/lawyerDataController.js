import supabase from '../config/database.js';
import { LAWYER_TABLE } from '../config/constants.js';

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
    console.error(`Error fetching lawyer: `, error);

    res.status(500).json({ error });
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
