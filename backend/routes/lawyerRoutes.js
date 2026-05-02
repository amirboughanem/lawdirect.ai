import express from 'express';
import { fetchLawyer } from '../controllers/lawyerDataController.js';
import { fetchLawyerImage } from '../controllers/lawyerImageController.js';

const router = express.Router();

router.get('/:lawyerId', fetchLawyer);
router.get('/:lawyerId/image', fetchLawyerImage);

export default router;
