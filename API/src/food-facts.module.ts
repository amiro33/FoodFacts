import { Module } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { Controller, Get } from '@nestjs/common';
@Injectable()
export class FoodFactsService {
  getHello(): string {
    return 'Food Facts GO HERE!';
  }
}

@Controller('food-facts')
export class FoodFactsController {
  constructor(private readonly foodFactsService: FoodFactsService) {}

  @Get()
  getHello(): string {
    return this.foodFactsService.getHello();
  }
}

@Module({
  imports: [],
  controllers: [FoodFactsController],
  providers: [FoodFactsService],
})
export class FoodFactsModule {}
