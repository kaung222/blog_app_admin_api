import { Entity, ManyToOne } from 'typeorm';
import { Post } from './post.entity';
import { BaseEntity } from '@/utils/base.entity';

@Entity()
export class Feedback extends BaseEntity {
  @ManyToOne(() => Post, (post) => post.feedbacks)
  post: Post;
}
