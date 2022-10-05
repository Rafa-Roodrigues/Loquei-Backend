import { Router } from 'express';
import { FilterAnnouncementsController } from '../../../../modules/announcements/useCases/filterAnnouncements/FilterAnnouncementsController';
import { ListAnnouncementsController } from '../../../../modules/announcements/useCases/listAnnouncements/ListAnnouncementsController';
import { ListAnnouncementsByCategoryController } from '../../../../modules/announcements/useCases/listAnnouncementsByCategory/ListAnnouncementsByCategoryController';
import { ListAnnouncementsLimitController } from '../../../../modules/announcements/useCases/listAnnouncementsLimit/ListAnnouncementsLimitController';
import { ListOneAnnouncementController } from '../../../../modules/announcements/useCases/listOneAnnouncement/ListOneAnnouncementController';

import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const announcementsRoutes = Router();

const listAnnouncementsController = new ListAnnouncementsController();
const listAnnouncementsByCategoryController = new ListAnnouncementsByCategoryController();
const listOneAnnouncementController = new ListOneAnnouncementController();
const filterAnnouncementsController = new FilterAnnouncementsController();
const listAnnouncementsLimitController = new ListAnnouncementsLimitController();

announcementsRoutes.get('/', listAnnouncementsController.handle);
announcementsRoutes.get('/filter', filterAnnouncementsController.handle);
announcementsRoutes.get('/:id', ensureAuthenticated, listOneAnnouncementController.handle);
announcementsRoutes.get('/limit/:id', ensureAuthenticated, listAnnouncementsLimitController.handle);
announcementsRoutes.get('/categories/:id', listAnnouncementsByCategoryController.handle);
