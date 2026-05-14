import express from 'express';
import upload from '../middlewares/multer.js';
import { createLawyer } from '../controllers/lawyerDataController.js';
import { uploadLawyerImage } from '../controllers/lawyerImageController.js';

const router = express.Router();

router.post('/lawyers', createLawyer);
router.put('/lawyers/:lawyerId/image', upload.single("image"), uploadLawyerImage);

export default router;
