import express from 'express';
import { createLawyer } from '../controllers/lawyerDataController.js';
// import { insertLawyerEmbedding } from '../controllers/lawyerImageController.js';

const router = express.Router();

router.post('/lawyers', createLawyer);
// router.get('/:lawyerId/image', insertLawyerEmbedding);

export default router;
