import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Image } from '../../../../../shared/infra/typeorm/entities/Image';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  whatsapp: string;

  @Column()
  telefone_fixo: string;

  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'id_image' })
  image: Image;

  @Column()
  id_image: number;
}
