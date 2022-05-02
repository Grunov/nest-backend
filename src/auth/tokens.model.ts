import { Column, Table, DataType, Model, BelongsTo, ForeignKey, BelongsToMany } from "sequelize-typescript";
import { UserModel } from "src/users/users.model";
import UserTokensModel from "./user-tokens.model";

interface ITokenCreationsAtts {
    value: string;
}

@Table({
    tableName: 'tokens'
})
export default class TokensModel extends Model <TokensModel, ITokenCreationsAtts> {

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
        allowNull: false
    })
    value: string;
    
    @BelongsToMany(() => UserModel, () => UserTokensModel )
    users: UserModel[];
}