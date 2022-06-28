import { Request, Response, Express } from 'express';
import { container } from 'tsyringe';
import { CreateAnnouncementUseCase } from './CreateAnnouncementUseCase';

export class CreateAnnouncementController {
  async handle(req: Request, res: Response) {
    const { id: id_user } = req.user;
    const data = req.body;
    const images = req.files as Express.Multer.File[] | undefined;

    const createAnnouncementUseCase = container.resolve(CreateAnnouncementUseCase);

    const adress = {
      adress: data.adress,
      city: data.city,
      district: data.district,
      number: data.number,
      state: data.state,
      zip_code: data.zip_code,
      complement: data.complement
    };

    const announcement = {
      description: data.description,
      meter: data.meter,
      title: data.title
    };

    const response = await createAnnouncementUseCase.execute({
      adress,
      announcement,
      id_category: data.id_category,
      id_user,
      images
    });

    return res.status(201).json(response);
  }
}
