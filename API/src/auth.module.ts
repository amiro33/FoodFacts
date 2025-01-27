import {
  Body,
  Controller,
  Get,
  Inject,
  Module,
  Post,
  Req,
} from '@nestjs/common';
import { User } from './db/user.entity';
import { Repository } from 'typeorm';

class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }
}

@Controller('auth')
class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('')
  async getUsers() {
    return await this.authService.getAllUsers();
  }
  @Post('login')
  login(@Body() reqBody) {}
}
@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
