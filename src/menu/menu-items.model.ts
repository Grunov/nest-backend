import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {MenusModel} from "./menus.model";

interface IMenuItemsCreationAttr {
    url: string;
    title: string;
    native: boolean;
}

@Table({
    tableName: 'menu-items',
    createdAt: false,
    updatedAt: false
})
export default class MenuItemsModel extends Model<MenuItemsModel, IMenuItemsCreationAttr> {

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
    url: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    title: string;

    @Column({type: DataType.BOOLEAN})
    native: boolean;

    @ForeignKey(() => MenusModel)
    @Column({ type: DataType.INTEGER })
    menuId: number;

    @BelongsTo(() => MenusModel)
    menu: MenusModel;

}