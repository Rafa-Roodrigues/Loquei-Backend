import { Router } from 'express';
import { CreateAnnouncementController } from '../../../../modules/announcements/useCases/createAnnouncement/CreateAnnouncementController';
import { DeleteAnnouncementController } from '../../../../modules/announcements/useCases/deleteAnnouncement/DeleteAnnouncementController';
import { ListAnnouncementsOfUserController } from '../../../../modules/announcements/useCases/listAnnouncementsOfUser/ListAnnouncementsOfUserController';
import { CreateUserController } from '../../../../modules/users/useCases/createUser/CreateUserController';
import { GetUserController } from '../../../../modules/users/useCases/getUser/GetUserController';
import { UpdateUserController } from '../../../../modules/users/useCases/updateUser/UpdateUserController';

import { uploadFile } from '../../../../utils/uploadFile';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';

export const usersRoutes = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const updateUserController = new UpdateUserController();
const createAnnouncementController = new CreateAnnouncementController();
const listAnnouncementsOfUserController = new ListAnnouncementsOfUserController();
const deleteAnnouncementController = new DeleteAnnouncementController();

usersRoutes.post('/', createUserController.handle);

usersRoutes.get('/', ensureAuthenticated, getUserController.handle);

usersRoutes.patch(
  '/',
  ensureAuthenticated,
  uploadFile.single('image'),
  updateUserController.handle
);

usersRoutes.post(
  '/announcements',
  ensureAuthenticated,
  uploadFile.array('image'),
  createAnnouncementController.handle
);

usersRoutes.get(
  '/announcements',
  ensureAuthenticated,
  listAnnouncementsOfUserController.handle
);

usersRoutes.delete(
  '/announcements/:id',
  ensureAuthenticated,
  deleteAnnouncementController.handle
);
