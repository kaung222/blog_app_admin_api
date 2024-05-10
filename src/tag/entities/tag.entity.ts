import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  OneToMany,
  TreeChildren,
} from 'typeorm';

@Entity()
@Tree('closure-table')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts: Post[];

  @TreeChildren()
  related: Tag[];
}
