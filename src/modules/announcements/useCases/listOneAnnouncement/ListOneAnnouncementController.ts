import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListOneAnnouncementUseCase } from './ListOneAnnouncementUseCase';

export class ListOneAnnouncementController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listOneAnnouncementUseCase = container.resolve(ListOneAnnouncementUseCase);

    const announcement = await listOneAnnouncementUseCase.execute(Number(id));

    return res.json([announcement]);
  }
}
