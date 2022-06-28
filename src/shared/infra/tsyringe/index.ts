import { container } from 'tsyringe';
import { AdressesRepository } from '../../../modules/announcements/infra/typeorm/repositories/AdressesRepository';
import { AnnouncementsRepository } from '../../../modules/announcements/infra/typeorm/repositories/AnnouncementsRepository';
import { CategoriesRepository } from '../../../modules/announcements/infra/typeorm/repositories/CategoriesRepository';
import { IAdressRepository } from '../../../modules/announcements/infra/typeorm/repositories/interfaces/IAdressRepository';
import { IAnnouncementsRepository } from '../../../modules/announcements/infra/typeorm/repositories/interfaces/IAnnouncementsRepository';
import { ICategoriesRepository } from '../../../modules/announcements/infra/typeorm/repositories/interfaces/ICategoriesRepository';
import { IUsersRepository } from '../../../modules/users/infra/typeorm/repositories/interfaces/IUsersRepository';
import { UsersRepository } from '../../../modules/users/infra/typeorm/repositories/UsersRepository';
import { Azure } from '../azure';
import { ImagesRepository } from '../typeorm/repositories/ImagesRepository';
import { IImagesRepository } from '../typeorm/repositories/interfaces/IImagesRepository';

container.registerSingleton<IImagesRepository>('ImagesRepository', ImagesRepository);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IAnnouncementsRepository>(
  'AnnouncementsRepository',
  AnnouncementsRepository
);

container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<IUsersRepository>('UsersRepository', UsersRepository);
container.registerSingleton<IImagesRepository>('ImagesRepository', ImagesRepository);
container.registerSingleton<IAdressRepository>('AdressesRepository', AdressesRepository);
container.registerSingleton('Azure', Azure);
