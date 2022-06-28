import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
    async handle(request: Request, response: Response){
        const { id } = request.user;

        const usersRepository = container.resolve(GetUserUseCase);

        const user = await usersRepository.execute({ id: Number(id)});

        return response.json(user);
    }
}