import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './user.entity';
import { UserService } from './users.service';
import { UserResponseDto } from './dtos/user-response.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return await this.userService.findUsers();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ): Promise<UserResponseDto> {
    return await this.userService.findUserById(id);
  }

  @Post()
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body()
    updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return await this.userService.deleteUser(id);
  }
}
