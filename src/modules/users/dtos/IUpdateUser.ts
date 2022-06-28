import { Image } from '../../../shared/infra/typeorm/entities/Image';

export interface IUpdateUser {
  id: number;
  email?: string;
  password?: string;
  image?: Image;
  whatsapp?: string;
  telefone_fixo: string;
}
