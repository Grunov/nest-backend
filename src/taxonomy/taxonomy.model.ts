import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { TermModel } from './term.model';

interface ITaxonomyCreationAttrs {
  title: string;
  name: string;
}

@Table({
  tableName: 'taxonomy',
  createdAt: false,
  updatedAt: false,
})
export class TaxonomyModel extends Model<
  TaxonomyModel,
  ITaxonomyCreationAttrs
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

  @HasMany(() => TermModel)
  terms: TermModel[];
}
