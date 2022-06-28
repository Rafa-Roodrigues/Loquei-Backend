import { Router } from 'express';
import { CreateCategoryController } from '../../../../modules/announcements/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '../../../../modules/announcements/useCases/listCategories/ListCategoriesController';
import { uploadFile } from '../../../../utils/uploadFile';

export const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post('/', uploadFile.single('image'), createCategoryController.handle);
categoriesRoutes.get('/', listCategoriesController.handle);
