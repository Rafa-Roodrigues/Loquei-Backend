import { ICreateUser } from '../../../../dtos/ICreateUser';
import { User } from '../../entities/User';

export interface IUsersRepository {
  create(data: ICreateUser): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
  findById(id: number): Promise<User | null>;
  getUser(id: number): Promise<User | null>;
}
