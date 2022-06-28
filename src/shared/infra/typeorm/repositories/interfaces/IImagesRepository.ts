import { ICreateImageDTO } from '../../dtos/ICreateImageDTO';
import { Image } from '../../entities/Image';

export interface IImagesRepository {
  create(data: ICreateImageDTO): Promise<Image>;
}
