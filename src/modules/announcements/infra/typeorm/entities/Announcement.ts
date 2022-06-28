import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Adress } from './Adress';
import { Category } from './Category';
import { Image } from '../../../../../shared/infra/typeorm/entities/Image';
import { User } from '../../../../users/infra/typeorm/entities/User';

@Entity('announcement')
export class Announcement {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  meter: string;

  @Column()
  id_adress: number;

  @Column()
  id_category: number;

  @Column()
  id_user: number;

  @OneToOne(() => Adress, (adress) => adress.id)
  @JoinColumn({ name: 'id_adress' })
  adress: Adress;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'id_category' })
  category: Category;

  @OneToMany(() => Image, (image) => image.announcement, {})
  images: Image[];

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'id_user' })
  user: User;
}
