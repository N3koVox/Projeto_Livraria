import { Router } from 'express';
import { Request, Response } from 'express';
import { register, login } from '../controllers/authController';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  try {
    const user = await register(name, email, password); 
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await login(email, password); 
    res.status(200).json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;