import { ICreateCategoryDTO } from '../../../../dtos/ICreateCategoryDTO';
import { Category } from '../../entities/Category';

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category | null>;
  findById(id: number): Promise<Category | null>;
  all(): Promise<Category[]>;
}
