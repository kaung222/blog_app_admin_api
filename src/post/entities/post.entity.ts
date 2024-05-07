import { Author } from 'src/author/entities/author.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  //properties
  @Column()
  introduction: string;

  @Column()
  contentList: { heading: string; body: string }[];

  @Column()
  conclusion: string;

  @Column()
  isPublished: boolean;

  //relations
  @OneToMany(() => Feedback, (feedback) => feedback.post)
  feedbacks: Feedback;

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;
}
