import { Controller } from 'egg';
import addUserRules from "../validate/addUserRules";

export default class UsersController extends Controller {
    public async index() {
        const { ctx } = this;
        try{
            const res = await ctx.service.users.getUsers();
            for (let key of res){
                delete key.dataValues.password
            }
            ctx.success(res);
        }catch (e) {
            ctx.error(400,'查找用户出错');
        }
    }
    public async createUser(){
        const {ctx} = this;
        const data = ctx.request.body;
        console.log(data);
        try{
            ctx.validate(addUserRules,data);
            const res = await ctx.service.users.createUser(data);
            console.log(res);
            ctx.success(res);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }

        }
    }
}
