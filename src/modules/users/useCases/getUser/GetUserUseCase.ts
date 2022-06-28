import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../infra/typeorm/repositories/interfaces/IUsersRepository";

interface IRequest {
    id: number;
}

@injectable()
export class GetUserUseCase {
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository){}

    execute({ id }: IRequest) {
        return this.usersRepository.getUser(id);
    }
}