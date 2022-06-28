import { Express } from 'express';
import { inject, injectable } from 'tsyringe';
import { mapQuest } from '../../../../config/axios';
import { AppError } from '../../../../shared/error/AppError';
import { Azure } from '../../../../shared/infra/azure';
import { IImagesRepository } from '../../../../shared/infra/typeorm/repositories/interfaces/IImagesRepository';
import { formatAdress } from '../../../../utils/formatAdress';
import { getAdress } from '../../../../utils/getAdress';
import { IUsersRepository } from '../../../users/infra/typeorm/repositories/interfaces/IUsersRepository';
import { IAdressRepository } from '../../infra/typeorm/repositories/interfaces/IAdressRepository';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';
import { ICategoriesRepository } from '../../infra/typeorm/repositories/interfaces/ICategoriesRepository';

export interface IRequest {
  images: Express.Multer.File[] | undefined;

  id_category: number;
  id_user: number;

  announcement: {
    title: string;
    description: string;
    meter: string;
  };

  adress: {
    zip_code: string;
    adress: string;
    number: string;
    state: string;
    city: string;
    district: string;
    complement?: string;
  };
}

@injectable()
export class CreateAnnouncementUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository,
    @inject('ImagesRepository') private imagesRepository: IImagesRepository,
    @inject('AdressesRepository') private adressesRepository: IAdressRepository,
    @inject('CategoriesRepository') private categoriesRepository: ICategoriesRepository,
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('Azure') private azure: Azure
  ) {}

  async execute({ adress, announcement, id_category, images, id_user }: IRequest) {
    const user = await this.usersRepository.findById(id_user);

    if (!user) throw new AppError('Usuario não existe');

    if (!images) throw new AppError('Enviar as imagens do produto');
    if (images.length === 0) throw new AppError('Enviar as imagens do produto');

    const category = await this.categoriesRepository.findById(id_category);

    if (!category) throw new AppError('Selecione uma categoria válida');

    // Cadastrando imagens na azure
    const imagesAzure = await Promise.all(
      images.map((image) =>
        this.azure.uploadFile({ nameContainer: 'imagensprodutos', file: image })
      )
    );

    // Cadastrando imagens no BD
    const productImages = await Promise.all(
      imagesAzure.map(({ etag, name, url }) =>
        this.imagesRepository.create({ etag, name, url })
      )
    );

    const infoAdress = await getAdress({
      city: adress.city,
      adress: adress.adress,
      number: adress.number,
      state: adress.state,
      zip_code: adress.zip_code
    });

    const { lat, lng } = infoAdress.data.results[0].locations[0].latLng;

    const newAdress = await this.adressesRepository.create({
      adress: adress.adress,
      city: adress.city,
      complement: adress.complement,
      district: adress.district,
      latitude: lat,
      longitude: lng,
      number: adress.number,
      state: adress.state,
      zip_code: adress.zip_code
    });

    // Criando um anuncio
    await this.announcementsRepository.create({
      description: announcement.description,
      meter: announcement.meter,
      title: announcement.title,
      images: productImages,
      id_adress: newAdress.id,
      id_category: category.id,
      id_user: user.id
    });
  }
}
