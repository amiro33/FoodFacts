import { Inject, Injectable } from '@nestjs/common';
import { AdditionalUserPropsDTO } from 'src/dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: Repository<User>,
  ) {}
  async updateAdditionalProperties(
    id: number,
    newProps: AdditionalUserPropsDTO,
  ) {
    await this.userRepository.update(id, {
      ...newProps,
    });
  }
  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }
  async findOneForLogin(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: {
        username: true,
        password: true,
      },
    });
  }
}
