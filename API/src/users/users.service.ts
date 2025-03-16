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
    console.log(newProps);

    const user = await this.findOneById(id);
    if (!user) throw new Error(`User with ID ${id} not found`);

    Object.assign(user, newProps); // Merge properties
    console.log(user);
    await this.userRepository
      .createQueryBuilder()
      .update(User)
      .set(newProps)
      .where('id = :id', { id })
      .execute();
  }
  async findOneById(id: number): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        sex: true,
        age: true,
        weight: true,
        height: true,
        first_name: true,
        last_name: true,
      },
    });
  }
  async findOne(username: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { username },
      select: {
        id: true,
        username: true,
        sex: true,
        age: true,
        weight: true,
        height: true,
        first_name: true,
        last_name: true,
      },
    });
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
