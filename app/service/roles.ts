import { Service } from 'egg';
const {Op} = require('sequelize');
export default class Users extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async getAllRoles() {
        return await this.ctx.model.Roles.findAll();
    }
    public async getRolesList(data){
        const currentPage = parseInt(data.currentPage);
        const pageSize = parseInt(data.pageSize);
        const {key} = data
        const defaultCondition = {
            [Op.or]:[
                {roleName:{[Op.substring]:key}},
                {roleDesc:{[Op.substring]:key}}
            ]
        }
        if (key ){
            const roles = await this.ctx.model.Roles.findAll({
                limit:pageSize,
                offset:(currentPage-1)*pageSize,
                where:defaultCondition
            })
            const total = await this.ctx.model.Roles.findAndCountAll({
                where:defaultCondition
            });
            return {roles:roles,total:total}
        }else {
            const roles = await this.ctx.model.Roles.findAll({
                limit:pageSize,
                offset:(currentPage-1)*pageSize
            })
            const total = await this.ctx.model.Roles.findAndCountAll();
            return {roles:roles,total:total}
        }


    }
    public async createRole(obj){
        console.log(obj);
        const {ctx} = this;
        const {roleName} = obj;
        let role;
        if (roleName){
            role = await ctx.model.Roles.findOne({
                where: {roleName}
            });
            if (role){
                throw new Error("角色存在");
            };
        }
        const data = await ctx.model.Roles.create(obj);
        const roleData = data['dataValues'];
        return roleData;
    }
    public async deleteRole(id){
        id = parseInt(id);
        const role = await this.ctx.model.Roles.findByPk(id);
        if (role){
            const data = await this.ctx.model.Roles.destroy({
                where:{id}
            });
            if (data>0){
                return role;
            }else {
                throw new Error("删除角色失败");
            }
        }else {
            throw new Error("角色不存在")
        }
    }
    public async updateRole(id,obj){
        const role = await this.ctx.model.Roles.findByPk(id);
        if (role){
            const data = await this.ctx.model.User.update(obj,{
                where:{id}
            });
            if (data.length > 0){
                return data;
            }else {
                throw new Error("更新用户失败");
            }
        }else {
            throw new Error("用户不存在");
        }
    }
}
