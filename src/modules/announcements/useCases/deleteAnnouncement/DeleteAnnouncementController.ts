import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { DeleteAnnouncementUseCase } from './DeleteAnnouncementUseCase';

export class DeleteAnnouncementController {
  async handle(req: Request, res: Response) {
    const { id: id_announcement } = req.params;
    const { id: id_user } = req.user;

    const deleteAnnouncementUseCase = container.resolve(DeleteAnnouncementUseCase);

    await deleteAnnouncementUseCase.execute({
      id_announcement: Number(id_announcement),
      id_user
    });

    return res.status(200).json();
  }
}
