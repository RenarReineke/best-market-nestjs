import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async getAll(): Promise<Role[]> {
    return await this.roleRepository.find({ relations: { users: true } });
  }

  async getRolesByTitles(rolesList: string[] | undefined): Promise<Role[]> {
    const roles = await this.roleRepository.find({
      where: {
        title: rolesList.length > 0 ? In(rolesList) : 'User',
      },
    });

    return roles;
  }

  async getOne(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: { id },
      relations: { users: true },
    });

    if (!role) {
      throw new NotFoundException('Роль не найдена');
    }
    return role;
  }

  async create(newRole: CreateRoleDto): Promise<Role> {
    const role = new Role();
    role.title = newRole.title;
    return await this.roleRepository.save(role);
  }

  async update(id: number, newRole: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { id } });
    role.title = newRole.title;
    return await this.roleRepository.save(role);
  }

  async delete(id: string): Promise<void> {
    await this.roleRepository.delete(id);
  }
}
