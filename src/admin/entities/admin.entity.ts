import { BaseEntity } from 'src/utils/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Admin extends BaseEntity {
  @Column()
  username: string;

  @Column({ unique: true })
  email: string;
}
