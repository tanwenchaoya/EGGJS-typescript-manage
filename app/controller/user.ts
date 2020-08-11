import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/PhoneUserRule'
const enum RegisterTypeEnum{
    Normal= 'normal',
    Email = 'email',
    Phone = 'phone'
}
export default class HomeController extends Controller {
    public async create() {
        const { ctx } = this;
        try {
            this.validateUserInfo();
            ctx.body = "注册成功";
        }catch (e) {
            if (e.errors){
                ctx.body = e.errors;
            } else {
                ctx.body = e.message;
            }
        }
    }
    private validateUserInfo(){
        const { ctx } = this;
        const data = ctx.request.body;
        const registerType = data.registerType;
        switch (registerType) {
            case RegisterTypeEnum.Normal:{
                ctx.validate(NormalUserRule,data);
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
