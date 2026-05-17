import express from 'express';
import { fetchLawyer } from '../controllers/lawyerDataController.js';
import { getSuggestedLawyers } from '../controllers/lawyerSemanticMatchController.js';

const router = express.Router();

router.get('/:lawyerId', fetchLawyer);
router.post('/match', getSuggestedLawyers);

export default router;
