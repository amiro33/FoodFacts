import { Injectable } from '@nestjs/common';

@Injectable()
export class FoodFactsService {
  getHello(): string {
    return 'Food Facts GO HERE!';
  }
}
