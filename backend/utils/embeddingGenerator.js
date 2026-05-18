import { EMBEDDING_MODEL } from '../config/constants.js';
import huggingface from '../config/huggingface.js';

export default async function generateEmbedding(bio) {
  console.log('TEXT TO EMBED: ' + bio.split('\n'));

  const output = await huggingface.featureExtraction({
    model: EMBEDDING_MODEL,
    provider: 'hf-inference',
    inputs: [bio.split(/[.!?\n]+/)],
  });

  return output[0];
}
