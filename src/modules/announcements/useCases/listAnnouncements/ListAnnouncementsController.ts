import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAnnouncementsUseCase } from './ListAnnouncementsUseCase';

export class ListAnnouncementsController {
  async handle(req: Request, res: Response) {
    const listAnnouncementsUseCase = container.resolve(ListAnnouncementsUseCase);

    const announcements = await listAnnouncementsUseCase.execute();

    return res.json(announcements);
  }
}
