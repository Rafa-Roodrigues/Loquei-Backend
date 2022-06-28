import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('adress')
export class Adress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ length: 8 })
  zip_code: string;

  @Column()
  city: string;

  @Column()
  adress: string;

  @Column()
  district: string;

  @Column()
  number: string;

  @Column()
  complement: string;

  @Column({ length: 2 })
  state: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;
}
