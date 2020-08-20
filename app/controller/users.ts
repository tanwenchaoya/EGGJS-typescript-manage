import { Controller } from 'egg';

export default class UsersController extends Controller {
    public async index() {
        const { ctx } = this;
        try{
            const res = await ctx.service.users.getUsers();
            ctx.success(res);
        }catch (e) {
            ctx.error(400,'查找用户出错');
        }
    }
}
