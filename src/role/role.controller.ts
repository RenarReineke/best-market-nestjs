import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() newRole: CreateRoleDto) {
    return this.roleService.create(newRole);
  }

  @Get()
  getAll() {
    return this.roleService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.roleService.getOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() newRole: UpdateRoleDto) {
    return this.roleService.update(+id, newRole);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
