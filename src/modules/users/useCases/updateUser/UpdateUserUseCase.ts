import { hash } from 'bcrypt';
import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { AppError } from '../../../../shared/error/AppError';
import { Azure } from '../../../../shared/infra/azure';
import { IImagesRepository } from '../../../../shared/infra/typeorm/repositories/interfaces/IImagesRepository';
import { IUsersRepository } from '../../infra/typeorm/repositories/interfaces/IUsersRepository';

interface IRequest {
  id: number;
  email?: string;
  password?: string;
  whatsapp?: string;
  telefone_fixo?: string;
  image?: Express.Multer.File | undefined;
  name?: string;
  lastname?: string;
}

@injectable()
export class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ImagesRepository')
    private imagesRepository: IImagesRepository,
    @inject('Azure') private azure: Azure
  ) {}

  async execute({ id, email, image, password, telefone_fixo, whatsapp, name, lastname }: IRequest) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new AppError('Usuario não encontrado!');

    if (image) {
      if (user.image) {
        await this.azure.deleteBlob({
          nameContainer: 'avatar',
          urlFile: user.image.name
        });
      }

      const { etag, name, url } = await this.azure.uploadFile({
        nameContainer: 'avatar',
        file: image
      });

      const imageUser = await this.imagesRepository.create({ name, etag, url });

      user.image = imageUser;
    }

    if (password) {
      const passwordEncrypted = await hash(password, 10);
      user.password = passwordEncrypted;
    }

    if (email) {
      user.email = email;
    }

    if (telefone_fixo) {
      user.telefone_fixo = telefone_fixo;
    }

    if (whatsapp) {
      user.whatsapp = whatsapp;
    }

    if(name) {
      user.name = name;
    }

    if (lastname) {
      user.lastname = lastname;
    }

    await this.usersRepository.create(user);

    return this.usersRepository.getUser(user.id);
  }
}
