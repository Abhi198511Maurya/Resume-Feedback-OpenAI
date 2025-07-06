import { Schema, model } from 'mongoose';

const ResumeSchema = new Schema({
  filename: String,
  filepath: String,
  feedback: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model('Resume', ResumeSchema);
