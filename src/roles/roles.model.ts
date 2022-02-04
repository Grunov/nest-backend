import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsToMany,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';
import { UserRolesModel } from './user-roles.model';

interface IRoleCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
})
export class RoleModel extends Model<RoleModel, IRoleCreationAttrs> {
  @ApiProperty({
    example: '1',
    description: 'Unique id of role',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'ADMIN',
    description: 'Unique value of role',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({
    example: 'Administrator',
    description: 'Description of role',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => UserModel, () => UserRolesModel)
  users: UserModel[];
}
