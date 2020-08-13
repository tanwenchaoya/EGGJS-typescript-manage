import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/PhoneUserRule'
const enum RegisterTypeEnum{
    Normal= 'normal',
    Email = 'email',
    Phone = 'phone'
}
export default class UserController extends Controller {
    public async create() {
        const { ctx } = this;
        try {
            this.validateUserInfo();
            const data = await ctx.service.user.createUser(ctx.request.body);
            console.log(data);
            ctx.success(data);
        }catch (e) {
            if (e.errors){
                ctx.error(400,e.errors);
            } else {
                ctx.error(400,e.message);
            }
        }
    }
    //校验前端数据
    private validateUserInfo(){
        const { ctx } = this;
        const data = ctx.request.body;
        const registerType = data.registerType;
        switch (registerType) {
            case RegisterTypeEnum.Normal:{
                //校验格式是否正确
                ctx.validate(NormalUserRule,data);
                //校验验证码是否正确
                ctx.helper.verifyImageCaptcha(data.captcha);
                break;
            }
            case RegisterTypeEnum.Email:{
                ctx.validate(EmailUserRule,data);
                ctx.helper.verifyEmailCaptcha(data.captcha);
                break;
            }
            case RegisterTypeEnum.Phone:{
                ctx.validate(PhoneUserRule,data);
                ctx.helper.verifySmsCaptcha(data.captcha);
                break;
            }
            default:
                throw new Error('注册类型不存在')
        }
    }
}
