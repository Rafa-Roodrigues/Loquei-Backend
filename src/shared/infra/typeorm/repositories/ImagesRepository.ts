import { singleton } from 'tsyringe';
import { Repository } from 'typeorm';
import { connection } from '../database';
import { ICreateImageDTO } from '../dtos/ICreateImageDTO';
import { Image } from '../entities/Image';
import { IImagesRepository } from './interfaces/IImagesRepository';

@singleton()
export class ImagesRepository implements IImagesRepository {
  private repository: Repository<Image>;

  constructor() {
    this.repository = connection.getRepository(Image);
  }

  async create({ id, name, url, etag }: ICreateImageDTO): Promise<Image> {
    const image = this.repository.create({ id, name, url, etag });

    return this.repository.save(image);
  }
}
