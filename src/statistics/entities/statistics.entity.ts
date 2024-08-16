import { Column, PrimaryGeneratedColumn } from 'typeorm';

export enum StatisticsOption {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
}
export class Statistics {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('int', { default: 0 })
  totolClinics: number;

  @Column('int', { default: 0 })
  totolPosts: number;

  @Column('int', { default: 0 })
  totolDoctors: number;

  @Column('int', { default: 0 })
  totolUsers: number;

  @Column('int', { default: 0 })
  totolServices: number;
}
