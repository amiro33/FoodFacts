
import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { HashUtil } from 'src/util/hash.util';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
    
  ) {}

  async getAllUsers() {
    return []
  }

  async createUser(username: string, password: string) {
    const hashedPassword = await HashUtil.hashPassword(password);
    await this.userRepository.save({ username, password: hashedPassword });
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await HashUtil.comparePassword(pass, user.password)) {
      const { password, ...result } = user;
      return result;  
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
