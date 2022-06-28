import { inject, injectable } from 'tsyringe';
import { AnnouncementsRepository } from '../../infra/typeorm/repositories/AnnouncementsRepository';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

@injectable()
export class ListAnnouncementsUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  async execute() {
    return this.announcementsRepository.all();
  }
}
