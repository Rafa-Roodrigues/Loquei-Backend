import { inject, injectable } from 'tsyringe';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

@injectable()
export class ListAnnouncementsByCategoryUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  async execute(id: number) {
    const announcements = await this.announcementsRepository.findByCategory(id);

    return announcements;
  }
}
