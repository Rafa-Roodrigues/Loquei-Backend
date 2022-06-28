import { Image } from '../../../shared/infra/typeorm/entities/Image';

export interface ICreateUser {
  id?: number;
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  password: string;
  whatsapp: string;
  telefone_fixo?: string;
  image?: Image;
}
