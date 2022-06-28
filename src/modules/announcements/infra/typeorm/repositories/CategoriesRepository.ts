import { Repository } from 'typeorm';
import { connection } from '../../../../../shared/infra/typeorm/database';
import { ICreateCategoryDTO } from '../../../dtos/ICreateCategoryDTO';
import { Category } from '../entities/Category';
import { ICategoriesRepository } from './interfaces/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = connection.getRepository(Category);
  }

  findById(id: number): Promise<Category | null> {
    return this.repository.findOne({ where: { id } });
  }

  create({ id, name, image }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ id, image, name });

    return this.repository.save(category);
  }

  findByName(name: string): Promise<Category | null> {
    return this.repository.findOne({ where: { name } });
  }

  all(): Promise<Category[]> {
    return this.repository
      .createQueryBuilder('c')
      .innerJoinAndSelect('c.image', 'i')
      .getMany();
  }
}
