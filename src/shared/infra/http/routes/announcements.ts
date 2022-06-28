import { Router } from 'express';
import { FilterAnnouncementsController } from '../../../../modules/announcements/useCases/filterAnnouncements/FilterAnnouncementsController';
import { ListAnnouncementsController } from '../../../../modules/announcements/useCases/listAnnouncements/ListAnnouncementsController';
import { ListAnnouncementsByCategoryController } from '../../../../modules/announcements/useCases/listAnnouncementsByCategory/ListAnnouncementsByCategoryController';
import { ListOneAnnouncementController } from '../../../../modules/announcements/useCases/listOneAnnouncement/ListOneAnnouncementController';

export const announcementsRoutes = Router();

const listAnnouncementsController = new ListAnnouncementsController();
const listAnnouncementsByCategoryController = new ListAnnouncementsByCategoryController();
const listOneAnnouncementController = new ListOneAnnouncementController();
const filterAnnouncementsController = new FilterAnnouncementsController();

announcementsRoutes.get('/', listAnnouncementsController.handle);
announcementsRoutes.get('/filter', filterAnnouncementsController.handle);
announcementsRoutes.get('/:id', listOneAnnouncementController.handle);
announcementsRoutes.get('/categories/:id', listAnnouncementsByCategoryController.handle);
