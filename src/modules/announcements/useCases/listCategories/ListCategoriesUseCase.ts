import { inject, injectable } from 'tsyringe';
import { ICategoriesRepository } from '../../infra/typeorm/repositories/interfaces/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository') private categoriesRepository: ICategoriesRepository
  ) {}

  async execute() {
    return this.categoriesRepository.all();
  }
}
