import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAnnouncementsOfUserUseCase } from './ListAnnouncementsOfUserUseCase';

export class ListAnnouncementsOfUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.user;

    const listAnnouncementsOfUserUseCase = container.resolve(
      ListAnnouncementsOfUserUseCase
    );

    const announcements = await listAnnouncementsOfUserUseCase.execute(id);

    return res.json(announcements);
  }
}
