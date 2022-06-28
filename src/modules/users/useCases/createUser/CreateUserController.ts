import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, lastname, email, cpf, password, whatsapp } = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({ cpf, email, lastname, name, password, whatsapp });

    return res.status(201).json();
  }
}
