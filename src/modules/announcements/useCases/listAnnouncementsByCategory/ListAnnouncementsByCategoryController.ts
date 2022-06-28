import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAnnouncementsByCategoryUseCase } from './ListAnnouncementsByCategoryUseCase';

export class ListAnnouncementsByCategoryController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;

    const listAnnouncementsByCategoryUseCase = container.resolve(
      ListAnnouncementsByCategoryUseCase
    );

    const announcements = await listAnnouncementsByCategoryUseCase.execute(Number(id));

    return res.json(announcements);
  }
}
