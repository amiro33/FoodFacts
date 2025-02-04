import { Module } from '@nestjs/common';
import { FoodFactsModule } from './food-facts.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [FoodFactsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
