import express from 'express';
import { fetchLawyerById } from '../controllers/lawyerDataController.js';

const router = express.Router();

router.get('/:lawyerId', fetchLawyerById);

export default router;
