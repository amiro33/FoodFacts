import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "src/users/users.module";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { userProviders } from "src/entities/user.entity";
import { DatabaseModule } from "src/database/database.module";

@Module({
  imports: [
    ConfigModule, // Ensure ConfigModule is imported
    UsersModule,
    DatabaseModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // Import ConfigModule
      inject: [ConfigService], // Inject ConfigService
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"), // Use ConfigService
        signOptions: { expiresIn: "60s" },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [...userProviders,AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
