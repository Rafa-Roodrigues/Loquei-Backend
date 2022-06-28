import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../../../users/infra/typeorm/repositories/interfaces/IUsersRepository';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

@injectable()
export class ListAnnouncementsOfUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  execute(id: number) {
    const user = this.usersRepository.findById(id);

    if (!user) throw new Error('Usuário não encontrado!');

    return this.announcementsRepository.listAnnouncementsOfUser(id);
  }
}
