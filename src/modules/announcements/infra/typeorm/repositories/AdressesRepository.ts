import { singleton } from 'tsyringe';
import { Repository } from 'typeorm';
import { connection } from '../../../../../shared/infra/typeorm/database';
import { ICreateAdressDTO } from '../../../dtos/ICreateAdressDTO';
import { Adress } from '../entities/Adress';
import { IAdressRepository } from './interfaces/IAdressRepository';

@singleton()
export class AdressesRepository implements IAdressRepository {
  private repository: Repository<Adress>;

  constructor() {
    this.repository = connection.getRepository(Adress);
  }

  create({
    adress,
    city,
    district,
    complement,
    latitude,
    longitude,
    number,
    state,
    zip_code,
    id
  }: ICreateAdressDTO): Promise<Adress> {
    const newAdress = this.repository.create({
      zip_code,
      adress,
      city,
      complement,
      id,
      latitude,
      longitude,
      number,
      state,
      district
    });

    return this.repository.save(newAdress);
  }

  findById(id: number): Promise<Adress | null> {
    return this.repository.findOne({ where: { id } });
  }
}
