import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { FilterAnnouncementsUseCase } from './FilterAnnouncementsUseCase';

export class FilterAnnouncementsController {
  async handle(req: Request, res: Response) {
    const { categorias, min, max, endereco, numero, estado, cidade, cep, km } = req.query;

    const filterAnnouncementsUseCase = container.resolve(FilterAnnouncementsUseCase);

    const announcements = await filterAnnouncementsUseCase.execute({
      categories: categorias as string,
      max: Number(max),
      min: Number(min),
      km: Number(km),
      adress: endereco as string,
      city: cidade as string,
      number: numero as string,
      state: estado as string,
      zip_code: cep as string
    });

    return res.json(announcements);
  }
}
