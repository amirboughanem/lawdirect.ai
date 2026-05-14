import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import supabase from './config/database.js';
import lawyerRouter from './routes/lawyerRoutes.js';
import adminRouter from './routes/adminRoutes.js';

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
if (process.env.ENABLE_ADMIN_ROUTES == 'true') {
  app.use('/api/admin', adminRouter);
}

app.use(`/${process.env.API_VERSION}/lawyers`, lawyerRouter);

app.get('/hello', async (req, res) => {
  const { data, error } = await supabase
    .schema(process.env.SUPABASE_SCHEMA)
    .from('specialties')
    .select('specialty_id, name');

  if (error) return res.status(400).json({ error });

  return res.status(200).json({ data });
});

export default app;
