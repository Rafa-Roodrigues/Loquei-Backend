import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { configToken } from '../../../../config/token';
import { UsersRepository } from '../../../../modules/users/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../error/AppError';

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) {
    throw new AppError('Enviar o token!', 401);
  }

  const [, token] = bearerToken.split(' ');

  try {
    const decoded = verify(token, configToken.secret);

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(Number(decoded.sub));

    if (!user) throw new AppError('Usuário não existe!', 401);

    req.user = {
      id: user.id
    };

    next();
  } catch {
    throw new AppError('Token inválido!', 401);
  }
}
