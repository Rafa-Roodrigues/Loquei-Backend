import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { ListAnnouncementsLimitUseCase } from './ListAnnouncementsLimitUseCase';

export class ListAnnouncementsLimitController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    
    const listAnnouncementsLimitUseCase = container.resolve(ListAnnouncementsLimitUseCase);

    const announcements = await listAnnouncementsLimitUseCase.execute({id: Number(id)});

    return res.json(announcements);
  }
}
