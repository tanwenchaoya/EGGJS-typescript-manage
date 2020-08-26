import { Service } from 'egg';

export default class User extends Service {
    public async getUser({username,email,phone,password}){
        password = await this.ctx.helper.generatePwd(password);
        let res;
        if (email){
            res= await this.findUser({email:email, password:password});
        }
        else if (phone){
            res= await this.findUser({phone:phone, password:password});
        }else if(username){
            res= await this.findUser({username:username, password:password});
        }
        try {
            const userData = res['dataValues'];
            delete userData.password
            return userData;
        }catch (e) {
            throw new Error("用户名或密码不正确");
        }
    }
    public async createUser(obj) {
        const {username,email,phone,password} = obj
        obj.password = await this.ctx.helper.generatePwd(password);
        if (username){
            return await this.createUserByUserName(username,obj);
        }else if(email){
            return await this.createUserByEmail(email,obj);
        }else if (phone){
            return await this.createUserByPhone(phone,obj);
        }
    }
    private async createUserByUserName(username,obj){
        const res = await this.findUser({username:username});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create(obj)
        const userData = data['dataValues'];
        delete userData.password
        return userData;
    }
    private async createUserByEmail(email,obj){
        const res = await this.findUser({email:email});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create(obj)
        const userData = data['dataValues'];
        delete userData.password
        return userData;
    }
    private async createUserByPhone(phone,obj){
        const res = await this.findUser({phone:phone});
        if (res){
            throw new Error("用户已存在");
        }
        const data = await this.ctx.model.User.create(obj)
        const userData = data['dataValues'];
        delete userData.password
        return userData;
    }
    private async findUser(options){
        const data = await this.ctx.model.User.findOne({where:options});
        return data;
    }
}