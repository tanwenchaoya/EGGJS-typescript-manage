import { Service } from 'egg';
export default class Users extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async getUsers() {
        return await this.ctx.model.User.findAll();
    }
    public async createUser(obj){
        const {ctx} = this;
        const {username,password,email,phone} = obj;
        obj.password = ctx.helper.generatePwd(password);
        let user = await ctx.model.User.findOne({
            where: {username:username}
        });
        if (user){
            throw new Error("用户存在");
        };
        user=await ctx.model.User.findOne({
            where:{
                email:email
            }
        });
        if (user){
            throw new Error("邮箱已存在");
        };
        user=await ctx.model.User.findOne({
            where:{
                phone:phone
            }
        });
        if (user){
            throw new Error("手机号已存在");
        };
        const data = await ctx.model.User.create(obj);
        const userData = data['dataValues'];
        delete userData.password;
        return userData;


    }
}
