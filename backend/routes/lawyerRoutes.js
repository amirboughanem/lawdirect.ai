import express from 'express';
import { fetchLawyer } from '../controllers/lawyerDataController.js';

const router = express.Router();

router.get('/:lawyerId', fetchLawyer);

export default router;
