/**
 * @desc 用户表
 */
import {
    AutoIncrement,
    Column,
    DataType,
    Model,
    PrimaryKey,
    Table,
    CreatedAt,
    UpdatedAt,
    HasMany,
    BelongsToMany
} from 'sequelize-typescript';
import {Oauths} from './oauths'
import {Roles} from "./roles";
import {UserRole} from "./userRole";
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
        allowNull:true,
        unique:true,
        validate:{
            isEmail:true
        }
    })
    email: string;
    @Column({
        type:DataType.STRING,
        comment: '用户手机',
        allowNull:true,
        unique:true,
        validate:{
            is:/^1[345678]\d{9}$/
        }
    })
    phone: string;
    @Column({
        type:DataType.STRING,
        comment: '用户密码',
        unique:false,
        allowNull:true,
        validate:{
            is:/^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9.]{8,100}$/
        }
    })
    password: string;
    @Column({
        type:DataType.BOOLEAN,
        comment: '是否三方授权',
        unique:false
    })
    github: number;

    @Column({
        type:DataType.BOOLEAN,
        comment: '是否注销',
        unique:false
    })
    userState: boolean;
    @Column({
        type:DataType.BOOLEAN,
        comment: '是否本地注册',
        unique:false
    })
    local: boolean;
    @Column({
        type:DataType.STRING,
        comment: '用户头像',
        unique:false,
        /*get(){
            const value = this.getDataValue('avatarUrl');
            return value?"http://127.0.0.1:7001"+value:'';
        }*/
    })
    avatarUrl: string;
    //需要注意的是虚拟字段不会出现在datavalues里面
    @Column({
        type:DataType.VIRTUAL,
        get(){
            return "http://127.0.0.1:7001";
        }
    })
    baseUrl: string;

    @HasMany(() => Oauths)
    players: Oauths[];
    @BelongsToMany(() => Roles,()=>UserRole)
    roles: Roles[];
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => User;