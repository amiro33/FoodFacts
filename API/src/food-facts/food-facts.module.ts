import { Module } from '@nestjs/common';
import { FoodFactsController } from './food-facts.controller';
import { FoodFactsService } from './food-facts.service';
import { foodCategoryProviders } from 'src/entities/category.entity';
import { foodItemProviders } from 'src/entities/food_item.entity';
import { trackingEntryProviders } from 'src/entities/tracking_entry.entity';

@Module({
  imports: [],
  controllers: [FoodFactsController],
  providers: [
    ...foodCategoryProviders,
    ...foodItemProviders,
    ...trackingEntryProviders,
    FoodFactsService,
  ],
})
export class FoodFactsModule {}
