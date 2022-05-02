import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
} from 'sequelize-typescript';
import { NodeTypesModel } from './node-types.model';

interface INodeCreationAttrs {
  typeId: number;
}

@Table({
  tableName: 'nodes',
  createdAt: false,
  updatedAt: false,
})
export class NodesModel extends Model<NodesModel, INodeCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => NodeTypesModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  typeId: number;
}
