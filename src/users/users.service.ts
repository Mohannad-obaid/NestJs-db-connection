import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(idUser: number): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneById(idUser);
    if (!user) {
      throw new NotFoundException(`Not found user ${idUser}`);
    }
    return new UserResponseDto(user);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.save(createUserDto);
    if (!user) {
      throw new InternalServerErrorException('Error creating user');
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 1) find user by id
    const user = await this.userRepository.findOneById(id);

    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }

    // 2) update user
    const userUpdate = { ...user, ...updateUserDto };

    // 3) save user
    const upUser = await this.userRepository.save(userUpdate);
    if (!upUser) {
      throw new InternalServerErrorException('Error updating user');
    }

    return upUser;
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.userRepository.findOneById(id);
    if (!user) {
      throw new NotFoundException(`Not found user ${id}`);
    }
    await this.userRepository.delete(id);
  }
}
