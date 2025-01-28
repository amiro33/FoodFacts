import { Module } from '@nestjs/common';
import { FoodFactsController } from './food-facts.controller';
import { FoodFactsService } from './food-facts.service';

@Module({
  imports: [],
  controllers: [FoodFactsController],
  providers: [FoodFactsService],
})
export class FoodFactsModule {}
