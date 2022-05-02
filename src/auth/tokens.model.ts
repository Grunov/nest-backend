import { Column, Table, DataType, Model, BelongsTo, ForeignKey } from "sequelize-typescript";
import { UserModel } from "src/users/users.model";

interface ITokenCreationsAtts {
    value: any;
    userId: number
}

@Table({
    tableName: 'tokens'
})
export default class TokensModel extends Model<TokensModel, ITokenCreationsAtts> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING(1000),
        unique: true,
        allowNull: false
    })
    value: any;

    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @BelongsTo(() => UserModel)
    user: UserModel
}