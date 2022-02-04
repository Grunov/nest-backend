import {
  Model,
  DataType,
  Table,
  Column,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';
import { RoleModel } from './roles.model';

@Table({
  tableName: 'user_roles',
  createdAt: false,
  updatedAt: false,
})
export class UserRolesModel extends Model<UserRolesModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => RoleModel)
  @Column({ type: DataType.INTEGER })
  roleId: number;
}
