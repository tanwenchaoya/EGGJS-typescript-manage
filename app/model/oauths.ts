/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table ,CreatedAt,UpdatedAt,ForeignKey,BelongsTo} from 'sequelize-typescript';
import {User} from './user'
@Table({
    modelName: 'oauth'
})
export class Oauths extends Model<Oauths> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: '用户ID'
    })
    id: number;

    @Column({
        type:DataType.STRING,
        comment: '授权令牌',
        allowNull:true
    })
    access_token: string;

    @Column({
        type:DataType.STRING,
        comment: '授权平台',
        allowNull:true
    })
    provider: string;
    @Column({
        type:DataType.INTEGER,
        comment: '授权账号',
        unique:true,
        allowNull:false
    })
    uid: number;
    @ForeignKey(()=> User)
    @Column({
        type:DataType.INTEGER,
        comment: '用户id',
        unique:false,
        allowNull:false
    })
    user_id: number;
    @BelongsTo(() => User)
    user: User;
    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
};
export default () => Oauths;