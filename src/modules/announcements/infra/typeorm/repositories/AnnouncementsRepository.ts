import { singleton } from 'tsyringe';
import { Repository } from 'typeorm';
import { connection } from '../../../../../shared/infra/typeorm/database';
import { ICreateAnnouncementDTO } from '../../../dtos/ICreateAnnouncementDTO';
import { Announcement } from '../entities/Announcement';
import { IAnnouncementsRepository } from './interfaces/IAnnouncementsRepository';

import { IFilterDTO } from '../../../dtos/IFilterDTO';

@singleton()
export class AnnouncementsRepository implements IAnnouncementsRepository {
  private repository: Repository<Announcement>;

  constructor() {
    this.repository = connection.getRepository(Announcement);
  }

  create({
    id_adress,
    id_category,
    description,
    id_user,
    images,
    meter,
    title,
    id
  }: ICreateAnnouncementDTO): Promise<Announcement> {
    const announcement = this.repository.create({
      id_adress,
      id_category,
      description,
      id,
      id_user,
      images,
      meter,
      title
    });

    return this.repository.save(announcement);
  }

  all() {
    return this.repository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.images', 'i')
      .innerJoinAndSelect('a.adress', 'd')
      .innerJoinAndSelect('a.category', 'c')
      .getMany();
  }

  async delete(id: number) {
    await this.repository
      .createQueryBuilder()
      .delete()
      .from(Announcement)
      .where('id = :id', { id })
      .execute();
  }

  findById(id: number): Promise<Announcement | null> {
    return this.repository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.images', 'i')
      .innerJoinAndSelect('a.adress', 'd')
      .innerJoinAndSelect('a.category', 'c')
      .innerJoinAndSelect('a.user', 'u')
      .andWhere('a.id = :id', { id })
      .getOne();
  }

  findByCategory(id: number): Promise<Announcement[]> {
    return this.repository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.images', 'i')
      .innerJoinAndSelect('a.adress', 'd')
      .innerJoinAndSelect('a.category', 'c')
      .andWhere('a.id_category = :id', { id })
      .getMany();
  }

  listAnnouncementsOfUser(id: number): Promise<Announcement[]> {
    return this.repository
      .createQueryBuilder('a')
      .innerJoinAndSelect('a.adress', 'd')
      .innerJoinAndSelect('a.category', 'c')
      .innerJoinAndSelect('a.images', 'i')
      .where('a.id_user = :id', { id })
      .getMany();
  }

  async filter({
    categories,
    latitude,
    longitude,
    max,
    min,
    km
  }: IFilterDTO): Promise<Announcement[]> {
    const query = this.repository
      .createQueryBuilder('a')
      .select('a.id, d.latitude, d.longitude')
      .innerJoin('a.adress', 'd')
      .innerJoin('a.category', 'c')
      .andWhere('a.id_adress = d.id')
      .andWhere('a.id_category = c.id');

    if (categories && categories.length > 0) {
      query.andWhere('a.id_category IN (:...ids)', { ids: categories });
    }

    if (min && max) query.andWhere('a.meter BETWEEN :min AND :max', { min, max });

    if (min && !max) query.andWhere(`a.meter >= :min`, { min });

    if (max && !min) query.andWhere('a.meter <= :max', { max });

    if (latitude && longitude) {
      query
        .addSelect(
          '(6371 * acos( cos(radians(:latitude)) * cos(radians(latitude)) * cos(radians(:longitude) - radians(longitude)) + sin(radians(:latitude)) * sin(radians(latitude))))',
          'distance'
        )
        .having('distance <= :km')
        .setParameters({ latitude, longitude, km });
      return query.getRawMany();
    }

    return query.getRawMany();
  }
}
