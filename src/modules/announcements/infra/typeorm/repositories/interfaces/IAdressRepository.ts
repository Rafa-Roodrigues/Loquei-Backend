import { ICreateAdressDTO } from '../../../../dtos/ICreateAdressDTO';
import { Adress } from '../../entities/Adress';

export interface IAdressRepository {
  create(data: ICreateAdressDTO): Promise<Adress>;

  findById(id: number): Promise<Adress | null>;
}
