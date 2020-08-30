import { Controller } from 'egg';
export default class UsersController extends Controller {
    public async index() {
        const {ctx} = this;
        console.log(ctx.query);
        try{
            if (Object.keys(ctx.query).length !== 0){
                const res = await ctx.service.roles.getRolesList(ctx.query);
                ctx.success(res);
            }else {
                console.log("11111111");
                const res = await ctx.service.roles.getAllRoles();
                ctx.success(res);
            }

        }catch (e) {
            ctx.error(400,'查找用户出错');
        }
    }
    public async create(){
        const {ctx} = this;
        const data = ctx.request.body;
        try{
            const res = await ctx.service.roles.createRole(data);
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
        const {ctx} = this;
        const {id} = ctx.params;
        try{
            const data = await ctx.service.roles.deleteRole(id);
            ctx.success(data);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }
        }
    }
    public async update(){
        const {ctx} = this;
        const {id} = ctx.params;
        const obj = ctx.request.body;
        console.log(obj);
        try{
            // ctx.validate(addUserRules,obj);
            const res = await ctx.service.roles.updateRole(id,obj);
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
