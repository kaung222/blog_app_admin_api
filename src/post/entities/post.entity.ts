import { Author } from '@/auth/entities/author.entity';
import { Feedback } from '@/feedback/entities/feedback.entity';
import { Tag } from '@/tag/entities/tag.entity';
import { BaseEntity } from '@/utils/base.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Post extends BaseEntity {
  // Properties
  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  body: string;

  @Column()
  metaDescription: string;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  @Column({ nullable: true })
  featuredImage: string;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  timeToRead: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: null, nullable: true })
  publishedAt: Date;

  @Column({ default: false })
  isFeatured: boolean;

  // Relations
  @OneToMany(() => Feedback, (feedback) => feedback.post)
  feedbacks: Feedback[];

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;
}
