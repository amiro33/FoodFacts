import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
} from 'typeorm';

@Entity()
export class FoodItem {
  @ManyToOne(() => Category, (category) => category.id, { nullable: true })
  category: Category | null;

  @RelationId((foodItem: FoodItem) => foodItem.category)
  @Column({ type: 'integer', nullable: true })
  category_id: number | null;
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column({ type: 'varchar', nullable: true })
  barcode: string;

  @CreateDateColumn()
  created_at: Date;
}

import { DataSource } from 'typeorm';
import { Category } from './category.entity';

export const foodItemProviders = [
  {
    provide: 'FOOD_ITEMS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(FoodItem),
    inject: ['DATA_SOURCE'],
  },
];
