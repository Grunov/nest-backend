import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { NodesModel } from "./nodes.model";

interface INodeTypesCreationAttrs {
    title: string;
    name: string;
}

@Table({
    tableName: 'node-types',
    createdAt: false,
    updatedAt: false
})
export class NodeTypesModel extends Model<NodeTypesModel, INodeTypesCreationAttrs> {

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

    @HasMany(() => NodesModel)
    nodes: NodesModel[];

}