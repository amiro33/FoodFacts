import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
  ) {
  }
  async createUser(username: string, password: string) {
    await this.userRepository.save({ username, password });
  }
  async findOneById(id: number): Promise<User | null>  {
    return this.userRepository.findOne({where: {id}});

  }
  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({where: {username}});
  }
}
