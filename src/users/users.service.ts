import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './users.model';
import { CreateUserDto } from './dto/create-user-dto';
import { RolesService } from 'src/roles/roles.service';
import { RoleModel } from 'src/roles/roles.model';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
    private roleService: RolesService,
  ) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    const role = await this.roleService.getRoleByValue('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  async getUsers() {
    const users = await this.userRepository.findAll({
      include: {
        model: RoleModel,
      },
      attributes: { exclude: ['password'] },
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: {
        model: RoleModel,
      },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);

    if (user && role) {
      user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async ban(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (user) {
      user.banned = true;
      user.banReason = dto.banReason;
      await user.save();
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
