import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodFactsModule } from './food-facts/food-facts.module';

@Module({
  imports: [FoodFactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
