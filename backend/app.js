import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import supabase from './config/database.js';

import lawyerDetailsRouter from './routes/lawyerRoutes.js';

const app = express();

dotenv.config();
app.use(cors());
app.use(`/${process.env.API_VERSION}/lawyers`, lawyerDetailsRouter);
app.use(express.json());

app.get('/test', async (req, res) => {
  const { data, error } = await supabase
    .schema(process.env.SUPABASE_SCHEMA)
    .from('specialties')
    .select('specialty_id, name');

  if (error) return res.status(400).json({ error });

  return res.status(200).json({ data });
});

export default app;
