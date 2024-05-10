import { Post } from 'src/post/entities/post.entity';
import { BaseEntity } from 'src/utils/base.entity';
import hashPassword from 'src/utils/hash-password';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Author extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Post, (post) => post.author, { nullable: true })
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashPassword(this.password);
  }
}
