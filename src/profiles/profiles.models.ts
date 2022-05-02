import { Model, Table, Column, DataType } from "sequelize-typescript";

interface IProfileCreationAttrs {
    name: string;
    age: number;
    about: string;
    image: string;
    phone: string;
}

@Table({
    tableName: 'profiles'
})
export default class ProfilesModel extends Model<ProfilesModel, IProfileCreationAttrs> {
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

    @Column({ 
        type: DataType.INTEGER, 
        allowNull: false
    })
    age: string;

    @Column({ 
        type: DataType.TEXT, 
        allowNull: false 
    })
    about: string;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    image: string;

    @Column({ 
        type: DataType.STRING, 
        allowNull: false 
    })
    phone: string;
}