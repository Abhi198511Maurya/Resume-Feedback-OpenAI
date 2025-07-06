import { readFileSync } from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';
import Resume from '../models/Resume.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export async function uploadResume(req, res) {
  try {
    const file = req.file;
    if (!file) return res.status(400).json({ msg: 'No file uploaded' });

    const filePath = path.join(__dirname, '../uploads', file.filename);
    const textContent = readFileSync(filePath, 'utf8'); // works only if .txt

    // for PDF/DOCX: use a library like pdf-parse or mammoth (optional)
    // here assume it's a .txt for simplicity

    const prompt = `I have the following resume:\n\n${textContent}\n\nPlease provide constructive feedback to improve it, including formatting, content, and keywords.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    });

    const feedback = completion.choices[0].message.content;

    const resume = new Resume({
      filename: file.originalname,
      filepath: filePath,
      feedback,
    });
    await resume.save();

    res.status(200).json({ msg: 'Resume uploaded & feedback generated', feedback });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
}
