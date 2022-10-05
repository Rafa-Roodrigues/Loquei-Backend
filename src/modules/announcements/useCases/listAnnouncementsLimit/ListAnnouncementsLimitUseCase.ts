import { inject, injectable } from 'tsyringe';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

interface IRequest {
  id: number;
}

@injectable()
export class ListAnnouncementsLimitUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  async execute({ id }: IRequest) {
    return this.announcementsRepository.limitAnnouncements(id);
  }
}
