import { Router } from 'express';
import multer, { diskStorage } from 'multer';
import { uploadResume } from '../controllers/resumeController.js';

const router = Router();

const storage = diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload = multer({ storage });

router.post('/upload', upload.single('resume'), uploadResume);

export default router;
