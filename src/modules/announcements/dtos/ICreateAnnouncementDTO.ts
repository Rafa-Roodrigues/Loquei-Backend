import { Image } from '../../../shared/infra/typeorm/entities/Image';

export interface ICreateAnnouncementDTO {
  id?: number;
  title: string;
  description: string;
  meter: string;
  id_user: number;
  id_adress: number;
  id_category: number;
  images: Image[];
}
