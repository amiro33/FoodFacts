import { Controller, Get } from '@nestjs/common';
import { FoodFactsService } from './food-facts.service';

@Controller()
export class FoodFactsController {
  constructor(private readonly foodFactsService: FoodFactsService) {}

  @Get()
  getHello(): string {
    return this.foodFactsService.getHello();
  }
}
