import { Service } from 'egg';

export default class User extends Service {
    public async createUser({username,email,phone,password}) {
        if (username){
            return await this.createUserByUserName(username,password);
        }else if(email){
            return await this.createUserByEmail(email,password);
        }else if (phone){
            return await this.createUserByPhone(phone,password);
        }
    }
    private async createUserByUserName(username,password){
        password = this.ctx.helper.generatePwd(password);
        const res = await this.findUser({username:username});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create({
            username:username,
            password:password
        })
        return data['dataValues'];
    }
    private async createUserByEmail(email,password){
        password = this.ctx.helper.generatePwd(password);
        const res = await this.findUser({email:email});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create({
            email:email,
            password:password
        })
        return data['dataValues'];
    }
    private async createUserByPhone(phone,password){
        password = this.ctx.helper.generatePwd(password);
        const res = await this.findUser({phone:phone});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create({
            phone:phone,
            password:password
        })
        return data['dataValues'];
    }
    private async findUser(options){
        const data = await this.ctx.model.User.findOne({where:options});
        return data;
    }
}