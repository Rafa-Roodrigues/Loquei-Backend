import { Express } from 'express';
import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../infra/typeorm/repositories/interfaces/IUsersRepository';
import { AppError } from '../../../../shared/error/AppError';

interface IRequest {
  name: string;
  lastname: string;
  email: string;
  cpf: string;
  password: string;
  whatsapp: string;
}

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ cpf, email, lastname, name, password, whatsapp }: IRequest) {
    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists) throw new AppError('Email já cadastrado');

    const cpfExists = await this.usersRepository.findByCpf(cpf);

    if (cpfExists) throw new AppError('CPF já cadastrado');

    const passwordEncrypted = await hash(password, 10);

    await this.usersRepository.create({
      cpf,
      email,
      lastname,
      name,
      password: passwordEncrypted,
      whatsapp
    });
  }
}
