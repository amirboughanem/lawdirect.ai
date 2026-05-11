import { InferenceClient } from '@huggingface/inference';

const huggingface = new InferenceClient(process.env.HUGGING_FACE_ACCESS_TOKEN);

export default huggingface;
