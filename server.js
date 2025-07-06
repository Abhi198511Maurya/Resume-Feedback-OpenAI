import "dotenv/config"
import express from 'express';
import { connect } from 'mongoose';
import resumeRoutes from './routes/resumeRoutes.js';

const app = express();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/resumes', resumeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
