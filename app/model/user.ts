/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table ,CreatedAt,UpdatedAt,HasMany} from 'sequelize-typescript';
import {Oauths} from './oauths'
@Table({
    modelName: 'user'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: '用户ID'
    })
    id: number;

    @Column({
        type:DataType.STRING,
        comment: '用户姓名',
        unique:true,
        allowNull:true,
        validate:{
            is:/^[a-zA-Z0-9\-]{6,}$/
        }
    })
    username: string;

    @Column({
        type:DataType.STRING,
        comment: '用户邮箱',
        unique:true,
        allowNull:true,
        validate:{
            isEmail:true
        }
    })
    email: string;
    @Column({
        type:DataType.STRING,
        comment: '用户手机',
        unique:true,
        allowNull:true,
        validate:{
            is:/^1[345678]\d{9}$/
        }
    })
    phone: string;
    @Column({
        type:DataType.STRING,
        comment: '用户密码',
        unique:true,
        validate:{
            is:/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9.]{8,100}$/
        }
    })
    password: string;
    @Column({
        type:DataType.INTEGER,
        comment: '是否三方授权',
        unique:false
    })
    github: number;
    @HasMany(() => Oauths)
    players: Oauths[];
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => User;