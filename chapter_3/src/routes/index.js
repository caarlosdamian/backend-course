import { Router } from 'express';
import authRouter from './authRoutes.js';
import todoRouter from './todoRoutes.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();
router.use('/auth', authRouter);

router.use('/todos', authMiddleware, todoRouter);

export default router;
