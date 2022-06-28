import { Router } from 'express';
import { announcementsRoutes } from './announcements';
import { categoriesRoutes } from './categories';
import { authenticateRoutes } from './authenticate';
import { usersRoutes } from './users';

export const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/announcements', announcementsRoutes);
routes.use('/users', usersRoutes);
routes.use('/authenticate', authenticateRoutes);
