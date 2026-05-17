import supabase from '../config/database.js';
import generateEmbedding from '../utils/embeddingGenerator.js';

export const getSuggestedLawyers = async (req, res) => {
  try {
    const userPrompt = req.body.user_prompt;

    console.log(userPrompt);

    if (!isPromptValid(userPrompt)) {
      return res.status(400).json({ message: `Prompt is invalid.` });
    }

    const promptEmbedding = await generateEmbedding(userPrompt);
    const lawyers = await matchLawyers(promptEmbedding);

    return res.status(200).json({ lawyers, message: `Lawyers returned.` });
  } catch (error) {
    console.error(`[LAWYER] [CONTROLLER] ERROR MATCHING PROMPT WITH SUGGESTED LAWYERS: `, error);

    return res.status(500).json({ message: error.message });
  }
};

const isPromptValid = (prompt) => {
  if (!prompt || typeof prompt !== 'string') {
    return false;
  }

  const trimmed = prompt.trim();
  const sentences = trimmed.split(/[.!?\n]+/).filter((sentence) => sentence.trim().length > 0);

  if (sentences.length < 4) {
    return false;
  }

  if (trimmed.length < 50) {
    return false;
  }

  const englishRegex = /^[A-Za-z0-9\s.,!?'"():;-]+$/;

  if (!englishRegex.test(trimmed)) {
    return false;
  }

  return true;
};

const matchLawyers = async (embedding) => {
  const { data, error } = await supabase
    .schema(process.env.SUPABASE_SCHEMA)
    .rpc('match_lawyers', { query_embedding: embedding });

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }

    throw error;
  }

  console.log(data);

  return data;
};
