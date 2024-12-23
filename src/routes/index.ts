import { Router } from 'express';
import userRoutes from './userRoutes';
import thoughtRoutes from './thoughtRoutes';

const router = Router();

// Mount user routes
router.use('/users', userRoutes);

// Mount thought routes
router.use('/thoughts', thoughtRoutes);

export default router;
