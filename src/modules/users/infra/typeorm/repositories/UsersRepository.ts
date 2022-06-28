import { Repository } from 'typeorm';
import { connection } from '../../../../../shared/infra/typeorm/database';
import { ICreateUser } from '../../../dtos/ICreateUser';
import { User } from '../entities/User';
import { IUsersRepository } from './interfaces/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = connection.getRepository(User);
  }

  async create({
    cpf,
    email,
    lastname,
    name,
    password,
    image,
    whatsapp,
    telefone_fixo,
    id
  }: ICreateUser): Promise<void> {

    const user = this.repository.create({
      name,
      lastname,
      email,
      cpf,
      password,
      id,
      whatsapp,
      telefone_fixo,
      image
    });

    await this.repository.save(user);
  }

  findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.image', 'i')
      .where('u.email = :email', { email })
      .getOne();
  }

  findByCpf(cpf: string): Promise<User | null> {
    return this.repository.findOne({ where: { cpf } });
  }

  getUser(id: number): Promise<User | null> {
    return this.repository
      .createQueryBuilder('u')
      .leftJoinAndSelect('u.image', 'i')
      .where('u.id = :id', { id })
      .getOne();
  }
}
