import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

export class CreateCategoryController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;
    const { file } = req;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    const category = await createCategoryUseCase.execute({
      nameCategory: name,
      image: file
    });

    return res.status(201).json(category);
  }
}
