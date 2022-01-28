import { ApiProperty } from '@nestjs/swagger';
import { Model, DataType, Table, Column, BelongsToMany } from 'sequelize-typescript';
import { RoleModel } from 'src/roles/roles.model';
import { UserRolesModel } from 'src/roles/user-roles.model';

interface IUserCreationAttrs {
  email: string;
  password: string;
}

@Table({
  tableName: 'users'
})
export class UserModel extends Model<UserModel, IUserCreationAttrs> {

  @ApiProperty({
    example: '1',
    description: 'Unique id of user'
  })
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  id: number;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Email of user'
  })
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  email: string;

  @ApiProperty({
    example: '123456',
    description: 'Password of user'
  })
  @Column({type: DataType.STRING, allowNull: false})
  password: string;

  @ApiProperty({
    example: false,
    description: 'User\'s ban status'
  })
  @Column({type: DataType.BOOLEAN, defaultValue: false})
  banned: boolean;

  @ApiProperty({
    example: 'Bad boy',
    description: 'User\'s ban reason'
  })
  @Column({type: DataType.STRING, allowNull: true})
  banReason: string;

  @BelongsToMany(() => RoleModel, () => UserRolesModel)
  roles: RoleModel[];

}