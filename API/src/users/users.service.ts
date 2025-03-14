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
    console.log(newProps)
    await this.userRepository.update(id, newProps);
    return await this.findOneById(id);
  }
  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }
  async findOne(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username }, select: {password: true, sex: true} });
  }
  async findOneForLogin(username: string) {
    return this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }
}
