import { Controller } from 'egg';
export default class UtilController extends Controller {

    public async createImageCode() {
        const { ctx } = this;
        //生成验证码
        ctx.helper.createImageCaptcha()
    }
    public async emailCode(){
        const { ctx } = this;
        const {email} = ctx.query;
        const res = await ctx.helper.sendEmail(email);
        console.log(res);
        if (res){
            ctx.success(res);
        }else {
            ctx.error(404,"发送失败");
        }
    }
}
