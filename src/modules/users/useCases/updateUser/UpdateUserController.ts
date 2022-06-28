import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateUserUseCase } from './UpdateUserUseCase';

export class UpdateUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;
    const { email, password, whatsapp, telefone_fixo, name, lastname } = req.body;
    const image = req.file;

    const updateUserUseCase = container.resolve(UpdateUserUseCase);

    const user = await updateUserUseCase.execute({
      id: Number(id),
      email,
      password,
      image,
      telefone_fixo,
      whatsapp,
      name,
      lastname
    });

    return res.status(200).json(user);
  }
}
