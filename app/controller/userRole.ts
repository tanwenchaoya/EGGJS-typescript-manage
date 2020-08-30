import { Controller } from 'egg';
// import user from "../model/user";
export default class UserRoleController extends Controller {
    public async create() {
        const { ctx } = this;
        const data = ctx.request.body;
        console.log(data);
        try{
            const res = await ctx.service.userRole.createUserRole(data);
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
    public async destroy(){
        console.log("11111111111111");
        const {ctx} = this;
        const {userId} = ctx.params;
        const {roleId} = ctx.request.body;
        console.log(userId, roleId);
        try{
            const data = await ctx.service.userRole.deleteUserRole(userId,roleId);
            ctx.success(data);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }
        }
    }

}
