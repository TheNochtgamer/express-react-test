import path from 'path';
import { Router } from 'express';

export const router = Router();
export const orderAtLast = true;

router.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});
