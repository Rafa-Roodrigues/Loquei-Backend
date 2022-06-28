import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/error/AppError';
import { Azure } from '../../../../shared/infra/azure';
import { ImagesRepository } from '../../../../shared/infra/typeorm/repositories/ImagesRepository';
import { ICategoriesRepository } from '../../infra/typeorm/repositories/interfaces/ICategoriesRepository';

interface IRequest {
  nameCategory: string;
  image: Express.Multer.File | undefined;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository') private categoriesRepository: ICategoriesRepository,
    @inject('ImagesRepository') private imagesRepository: ImagesRepository,
    @inject('Azure') private azure: Azure
  ) {}

  async execute({ nameCategory, image }: IRequest) {
    if (!image) throw new AppError('Enviar a imagem que representará a categoria');

    const category = await this.categoriesRepository.findByName(nameCategory);

    if (category) throw new AppError('Categoria já existe!');

    const { etag, name, url } = await this.azure.uploadFile({
      nameContainer: 'categorias',
      file: image
    });

    const imageCategory = await this.imagesRepository.create({ name, url, etag });

    const newCategory = await this.categoriesRepository.create({
      name: nameCategory,
      image: imageCategory
    });

    return newCategory;
  }
}
