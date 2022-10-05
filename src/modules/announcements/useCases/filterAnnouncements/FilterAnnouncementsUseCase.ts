/* eslint-disable prefer-const */
import { inject, injectable } from 'tsyringe';
import { getAdress } from '../../../../utils/getAdress';
import { IAnnouncementsRepository } from '../../infra/typeorm/repositories/interfaces/IAnnouncementsRepository';

interface IRequest {
  categories?: string;
  min?: number;
  max?: number;
  city?: string;
  state?: string;
  adress?: string;
  zip_code?: string;
  number?: string;
  km?: number;
}

@injectable()
export class FilterAnnouncementsUseCase {
  constructor(
    @inject('AnnouncementsRepository')
    private announcementsRepository: IAnnouncementsRepository
  ) {}

  async execute({
    categories,
    max,
    min,
    adress,
    city,
    number,
    state,
    zip_code
  }: IRequest) {
    const listCategories = categories?.split(';');

    let latitude = '';
    let longitude = '';

    if (adress && city && state && zip_code) {
      const infoAdress = await getAdress({
        adress,
        city,
        number: String(number),
        state,
        zip_code
      });

      const { lat, lng } = infoAdress.data.results[0].locations[0].latLng;
      latitude = lat;
      longitude = lng;      
    }

    const announcements = await this.announcementsRepository.filter({
      categories: listCategories,
      latitude,
      longitude,
      max,
      min,
    });

    return {
      announcements,
      user: {
        lat: latitude,
        lng: longitude
      }
    }
  }
}
