import { Router } from 'express';

export const router = Router();

router.get('/api', (req, res) => {
  res.send('Hello World!');
});
