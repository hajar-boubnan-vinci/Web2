import express, { Request, Response } from 'express';
import { getAllTexts, getTextsByLevel, getTextById, createText, updateText, deleteText } from '../services/texts';

interface TextRequestBody {
  content: string;
  level: 'easy' | 'medium' | 'hard';
}

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  const { level } = req.query;
  if (level) {
    const filteredTexts = getTextsByLevel(level as 'easy' | 'medium' | 'hard');
    return res.json(filteredTexts);
  }
  const texts = getAllTexts();
  return res.json(texts);
});

router.get('/:id', (req: Request<{ id: string }>, res: Response) => {
  const text = getTextById(Number(req.params.id));
  if (!text) return res.status(404).json({ error: 'Text not found' });
  return res.json(text);
});

router.post('/', (req: Request<object, object, TextRequestBody>, res: Response) => {
  const { content, level } = req.body;
  if (!content || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const newText = createText(content, level);
  return res.status(201).json(newText);
});

router.put('/:id', (req: Request<{ id: string }, object, TextRequestBody>, res: Response) => {
  const { content, level } = req.body;
  if (!content || !['easy', 'medium', 'hard'].includes(level)) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const updatedText = updateText(Number(req.params.id), content, level);
  if (!updatedText) return res.status(404).json({ error: 'Text not found' });
  return res.json(updatedText);
});

router.delete('/:id', (req: Request<{ id: string }>, res: Response) => {
  const success = deleteText(Number(req.params.id));
  if (!success) return res.status(404).json({ error: 'Text not found' });
  return res.sendStatus(204);
});

export default router;
