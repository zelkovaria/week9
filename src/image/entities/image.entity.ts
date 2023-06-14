// import { Post } from 'src/posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Images') //User가 테이블 명으로 생기는거임
export class Image {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 50 })
  imageUrl: string;
}
