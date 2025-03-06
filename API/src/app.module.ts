import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { FoodFactsModule } from './food-facts/food-facts.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    FoodFactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
