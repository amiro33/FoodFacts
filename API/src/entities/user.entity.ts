import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  username: string;

  @Column('text', { select: false })
  password: string;

  @Column({ type: 'text', nullable: true })
  sex: string;

  @Column({ type: 'integer', nullable: true })
  age: number;

  @Column({ type: 'integer', nullable: true })
  weight: number;

  @Column({ type: 'integer', nullable: true })
  height: number;
}

import { DataSource } from 'typeorm';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DATA_SOURCE'],
  },
];
