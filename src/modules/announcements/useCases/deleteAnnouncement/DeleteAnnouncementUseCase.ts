import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/error/AppError';
import { Azure } from '../../../../shared/infra/azure';
import { IUsersRepository } from '../../../users/infra/typeorm/repositories/interfaces/IUsersRepository';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

interface IRequest {
  id_announcement: number;
  id_user: number;
}

@injectable()
export class DeleteAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('Azure') private azure: Azure
  ) {}

  async execute({ id_announcement, id_user }: IRequest) {
    const user = await this.usersRepository.findById(id_user);

    if (!user) throw new AppError('Usuario não existe');

    const announcement = await this.announcementsRepository.findById(id_announcement);

    if (!announcement) {
      throw new AppError('Anúncio não encontrado!');
    }

    for (const image of announcement.images) {
      await this.azure.deleteBlob({
        nameContainer: 'imagensprodutos',
        urlFile: image.name
      });
    }

    await this.announcementsRepository.delete(id_announcement);
  }
}
