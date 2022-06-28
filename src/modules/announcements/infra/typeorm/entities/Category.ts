import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../../../../shared/infra/typeorm/entities/Image';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'id_image' })
  image: Image;

  @Column()
  id_image: number;
}
