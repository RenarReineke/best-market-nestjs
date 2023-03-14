import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  @Get()
  // @UseGuards(AuthGuard)
  @SetMetadata('roles', ['admin', 'manager'])
  async users(): Promise<User[]> {
    return await this.userService.getAll();
  }

  @Get(':id')
  async user(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.getOne(id);
  }

  @Put(':id')
  async updateUser(
    @Body() newUser: CreateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.userService.update(newUser, id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return await this.userService.delete(id);
  }
}
