import { inject, injectable } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../shared/error/AppError';
import { IUsersRepository } from '../../infra/typeorm/repositories/interfaces/IUsersRepository';
import { configToken } from '../../../../config/token';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email ou senha estão errados');

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email ou senha estão errados');

    const token = sign({}, configToken.secret, {
      subject: String(user.id),
      expiresIn: 86400000 // 1 dia
    });

    return {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      cpf: user.cpf,
      image: {
        ...user.image
      },
      token
    };
  }
}
