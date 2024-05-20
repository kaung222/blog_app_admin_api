// Example of entity definition
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OtpEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  otp: string;

  @Column()
  expiredAt: string;

  @Column()
  userId: string;
}
