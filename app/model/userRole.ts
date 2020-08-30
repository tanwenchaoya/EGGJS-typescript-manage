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
    ForeignKey
} from 'sequelize-typescript';
import {User} from "./user";
import {Roles} from "./roles";
@Table({
    modelName: 'userrole'
})
export class UserRole extends Model<UserRole> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: '角色用户关联表ID'
    })
    id: number;

    @ForeignKey(()=>User)
    @Column({field:"user_id",allowNull:false})
    userId:number;

    @ForeignKey(()=>Roles)
    @Column({field:"role_id",allowNull:false})
    roleId:number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => UserRole;