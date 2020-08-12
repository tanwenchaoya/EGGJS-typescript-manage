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
            ctx.body = "注册成功";
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
                break;
            }
            case RegisterTypeEnum.Phone:{
                ctx.validate(PhoneUserRule,data);
                break;
            }
            default:
                throw new Error('注册类型不存在')
        }
    }
}
