import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  DataType,
  Table,
  Column,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { UserModel } from 'src/users/users.model';

interface IPostCreationAttrs {
  title: string;
  content: string;
  userId: number;
  image: string;
}

@Table({
  tableName: 'posts',
})
export class PostModel extends Model<PostModel, IPostCreationAttrs> {
  @ApiProperty({
    example: 1,
    description: 'Unique id of post',
  })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Title of a best post',
    description: 'Title of post',
  })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => UserModel)
  author: UserModel;
}
