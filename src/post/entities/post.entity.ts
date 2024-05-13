import { Author } from '@/auth/entities/author.entity';
import { Feedback } from '@/feedback/entities/feedback.entity';
import { Tag } from '@/tag/entities/tag.entity';
import { generateUniqueNumber } from '@/utils';
import { BaseEntity } from '@/utils/base.entity';
import slugify from 'slugify';
import {
  BeforeInsert,
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

  @Column({ nullable: true })
  metaDescription: string;

  @Column({ nullable: true })
  featuredImage: string;

  @Column({ default: 0 })
  views: number;

  @Column({ nullable: true })
  timeToRead: number;

  @Column({ default: false })
  isPublished: boolean;

  @Column({ default: null })
  publishedAt: Date;

  // Relations
  @OneToMany(() => Feedback, (feedback) => feedback.post)
  feedbacks: Feedback[];

  @ManyToOne(() => Author, (author) => author.posts, { nullable: true })
  author: Author;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  @JoinTable()
  tags: Tag[];

  //   methods
  @BeforeInsert()
  createSlug() {
    const random = generateUniqueNumber();
    this.slug = slugify(this.title, { lower: true }) + '-' + random;
  }
}
