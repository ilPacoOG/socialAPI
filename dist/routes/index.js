import { Router } from 'express';
import userRoutes from './userRoutes.js';
import thoughtRoutes from './thoughtController.js';
const router = Router();
// Mount user routes
router.use('/users', userRoutes);
// Mount thought routes
router.use('/thoughts', thoughtRoutes);
export default router;
