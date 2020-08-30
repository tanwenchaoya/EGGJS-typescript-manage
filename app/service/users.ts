import { Service } from 'egg';
import {Roles} from "../model/roles";
const {Op} = require('sequelize');
export default class Users extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async getUsers() {
        return await this.ctx.model.User.findAll();
    }
    public async getUsersList(data){
        const currentPage = parseInt(data.currentPage);
        const pageSize = parseInt(data.pageSize);
        const {role,origin,type,key} = data
        const defaultCondition = {
            [Op.or]:[
                {username:{[Op.substring]:key}},
                {email:{[Op.substring]:key}},
                {phone:{[Op.substring]:key}}
            ]
        }
        if (key || role || origin ||type){
            const conditionList:Array<any> = [];
            if (key){
                conditionList.push(defaultCondition);
            }
            if (origin){
                conditionList.push({[origin]:true})
            }
            if (type){
                conditionList.push({[type]: {[Op.substring]: key}})
            }
            if (role){

            }
            const users = await this.ctx.model.User.findAll({
                limit:pageSize,
                offset:(currentPage-1)*pageSize,
                where:{
                    [Op.and]:conditionList
                },
                include:[
                    {model:Roles}
                ]
            })
            const total = await this.ctx.model.User.findAndCountAll({
                where:{
                    [Op.and]:conditionList
                }
            });
            return {users:users,total:total}
        }else {
            const users = await this.ctx.model.User.findAll({
                limit:pageSize,
                offset:(currentPage-1)*pageSize,
                include:[
                    {model:Roles}
                ]
            })
            const total = await this.ctx.model.User.findAndCountAll();
            return {users:users,total:total}
        }


    }
    public async createUser(obj){
        const {ctx} = this;
        const {username,password,email,phone} = obj;
        obj.password = ctx.helper.generatePwd(password);
        let user;
        if (username){
            user = await ctx.model.User.findOne({
                where: {username:username}
            });
            if (user){
                throw new Error("用户存在");
            };
        }
        if (email){
            user=await ctx.model.User.findOne({
                where:{
                    email:email
                }
            });
            if (user){
                throw new Error("邮箱已存在");
            };
        }
       if (phone){
           user=await ctx.model.User.findOne({
               where:{
                   phone:phone
               }
           });
           if (user){
               throw new Error("手机号已存在");
           };
       }
        console.log(obj);
        const data = await ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;
    }
    public async deleteUser(id){
        const user = await this.ctx.model.User.findByPk(id);
        if (user){
            const userData = user['dataValues'];
            delete userData.password;
            const data = await this.ctx.model.User.destroy({
                where:{id}
            });
            if (data>0){
                return userData;
            }else {
                throw new Error("删除用户失败");
            }
        }else {
            throw new Error("用户不存在")
        }
    }
    public async updateUser(id,obj){
        const user = await this.ctx.model.User.findByPk(id);
        if (user){
            const userData = user['dataValues'];
            delete userData.password;
            const data = await this.ctx.model.User.update(obj,{
                where:{id}
            });
            if (data.length > 0){
                console.log(userData);
                return userData;
            }else {
                throw new Error("更新用户失败");
            }
        }else {
            throw new Error("用户不存在");
        }
    }
}
