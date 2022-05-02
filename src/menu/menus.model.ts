import {Table, Model, Column, DataType, HasMany} from "sequelize-typescript";
import MenuItemsModel from "./menu-items.model";

interface IMenuCreationAttrs {
    name: string;
}

@Table({
    tableName: 'menus',
    createdAt: false,
    updatedAt: false
})
export class MenusModel extends Model<MenusModel, IMenuCreationAttrs>{

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string;

    @HasMany(() => MenuItemsModel)
    items: MenuItemsModel[];

}