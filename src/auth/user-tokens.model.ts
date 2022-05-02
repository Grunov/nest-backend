import { Column, Table, DataType, Model, ForeignKey } from "sequelize-typescript";
import { UserModel } from "src/users/users.model";
import TokensModel from "./tokens.model";

@Table({
    tableName: 'user-tokens'
})
export default class UserTokensModel extends Model {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ForeignKey(() => UserModel)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @ForeignKey(() => TokensModel)
    @Column({ type: DataType.INTEGER })
    tokenId: number;
}