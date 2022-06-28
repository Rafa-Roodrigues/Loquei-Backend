import { inject, injectable } from 'tsyringe';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

@injectable()
export class ListOneAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  execute(id_announcement: number) {
    return this.announcementsRepository.findById(id_announcement);
  }
}
