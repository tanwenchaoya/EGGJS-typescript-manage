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
    BelongsToMany
} from 'sequelize-typescript';
import {User} from "./user";
import {UserRole} from "./userRole";
@Table({
    modelName: 'role'
})
export class Roles extends Model<Roles> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: '角色ID'
    })
    id: number;

    @Column({
        type:DataType.STRING,
        field:'role_name',
        comment: '角色名称',
        unique:true,
        allowNull:false,
    })
    roleName: string;

    @Column({
        type:DataType.STRING,
        field:'role_desc',
        comment: '角色描述',
        unique:true,
        allowNull:false,
    })
    roleDesc: string;
    @Column({
        type:DataType.BOOLEAN,
        field:'role_state',
        comment: '是否注销',
        unique:false,
        allowNull:true,

    })
    roleState: boolean;

    @BelongsToMany(() => User,()=>UserRole)
    users: User[];
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => Roles;