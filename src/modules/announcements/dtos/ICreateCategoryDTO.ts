import { Image } from '../../../shared/infra/typeorm/entities/Image';

export interface ICreateCategoryDTO {
  id?: number;
  name: string;
  image: Image;
}
