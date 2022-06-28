import { SelectQueryBuilder } from 'typeorm';
import { ICreateAnnouncementDTO } from '../../../../dtos/ICreateAnnouncementDTO';
import { IFilterDTO } from '../../../../dtos/IFilterDTO';
import { Announcement } from '../../entities/Announcement';

export interface IAnnouncementsRepository {
  create(data: ICreateAnnouncementDTO): Promise<Announcement>;
  findById(id: number): Promise<Announcement | null>;
  findByCategory(id: number): Promise<Announcement[]>;
  delete(id: number): Promise<void>;
  all(): Promise<Announcement[]>;
  listAnnouncementsOfUser(id: number): Promise<Announcement[]>;
  filter({
    categories,
    latitude,
    longitude,
    max,
    min
  }: IFilterDTO): Promise<Announcement[]>;
}
