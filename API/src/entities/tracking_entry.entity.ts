import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  RelationId,
} from 'typeorm';

@Entity()
export class TrackingEntry {
  @ManyToOne((type) => User)
  user: Relation<User>;

  @ManyToOne((type) => FoodItem)
  food: Relation<FoodItem>;

  // end relationships

  @PrimaryGeneratedColumn()
  id: number;

  @RelationId((trackingEntry: TrackingEntry) => trackingEntry.user)
  @Column('integer')
  user_id: number;
  @RelationId((trackingEntry: TrackingEntry) => trackingEntry.food)
  @Column('integer')
  food_id: number;

  @Column('datetime')
  scan_date: Date;

  @Column('int')
  quantity: number;
}

import { DataSource } from 'typeorm';
import { User } from './user.entity';
import { FoodItem } from './food_item.entity';

export const trackingEntryProviders = [
  {
    provide: 'TRACKING_ENTRIES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TrackingEntry),
    inject: ['DATA_SOURCE'],
  },
];
