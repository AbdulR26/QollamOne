import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to QollamOne Express.js API',
  });
});

export default router;
