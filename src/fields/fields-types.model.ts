import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { FieldsModel } from './fields.model';

interface IFieldsTypesCreationAttrs {
  title: string;
  name: string;
}

@Table({
  tableName: 'fields_types',
  createdAt: false,
  updatedAt: false,
})
export class FieldsTypesModel extends Model<
  FieldsTypesModel,
  IFieldsTypesCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  name: string;

  @HasMany(() => FieldsModel)
  field: FieldsModel[];
}
