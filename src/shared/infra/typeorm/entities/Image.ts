import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Announcement } from '../../../../modules/announcements/infra/typeorm/entities/Announcement';

@Entity('image')
export class Image {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  etag: string;

  @ManyToOne(() => Announcement, (announcement) => announcement.images)
  @JoinColumn({ name: 'id_announcement' })
  announcement: Announcement;

  @Column()
  id_announcement: number;
}
