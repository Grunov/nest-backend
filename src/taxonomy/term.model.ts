import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { TaxonomyModel } from "./taxonomy.model";

interface ITermCreationAttrs {
    title: string;
    name: string;
}

@Table({
    tableName: 'term',
    createdAt: false,
    updatedAt: false
})
export class TermModel extends Model<TermModel, ITermCreationAttrs> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false 
    })
    title: string;
    
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false 
    })
    name: string;

    @ForeignKey(() => TaxonomyModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    taxonomyId: number;

    @BelongsTo(() => TaxonomyModel)
    taxonomy: TaxonomyModel;

}