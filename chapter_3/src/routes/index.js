import { Router } from 'express';
import authRouter from './authRoutes.js';
import todoRouter from './todoRoutes.js';

const router = Router();
router.use('/auth', authRouter);
router.use('/todos', todoRouter);

export default router;
