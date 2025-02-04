import { Body, Controller, Get, Inject, Injectable, Module, Post } from "@nestjs/common";
import { Repository } from "typeorm";
import { User, userProviders } from "./entities/user.entity";
import { DatabaseModule, databaseProviders } from "./database/database.module";
@Injectable()
class AuthService {
}
@Controller("auth")
class AuthController {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {
  }
  @Post('')
  async createUser(@Body() {username, password}) {
    let created = await this.userRepository.save({
      username: username,
      password: password
    })  
    return created;
  }
  @Get('') 
  async getAllUsers() {
    return await this.userRepository.find({})
  }
}

@Module({
  imports: [DatabaseModule],
  controllers: [AuthController],
  providers: [...userProviders, AuthService],
})
export class AuthModule {}
