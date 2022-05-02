import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { FieldsTypesModel } from './fields-types.model';

interface IFieldsCreationAttrs {
  typeId: number;
}

@Table({
  tableName: 'fields',
  createdAt: false,
  updatedAt: false,
})
export class FieldsModel extends Model<FieldsModel, IFieldsCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => FieldsTypesModel)
  @Column({
    type: DataType.INTEGER,
    unique: true,
    allowNull: false,
  })
  typeId: number;
}
