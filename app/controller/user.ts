import { Controller } from 'egg';
import NormalUserRule from '../validate/normalUserRule'
import EmailUserRule from '../validate/emailUserRule'
import PhoneUserRule from '../validate/PhoneUserRule'
const jwt = require('jsonwebtoken');

const enum RegisterTypeEnum{
    Normal= 'normal',
    Email = 'email',
    Phone = 'phone'
}
export default class UserController extends Controller {
    public async login(){
        const { ctx } = this;
        try{
            const data = ctx.request.body;
            this.validateUserInfo()
            ctx.helper.verifyImageCaptcha(data.captcha);
            const res = await ctx.service.user.getUser(ctx.request.body);
            //校验用户是否可用
            if(!res.userState){
                ctx.error(400,'用户已注销');
            }
            const token = jwt.sign(res, this.app.config.keys);
            // res.token = token
            ctx.cookies.set('token',token,{
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false
            })
            ctx.success(res);
        }catch (e) {
            if (e.errors){
                ctx.error(400,e.errors);
            } else {
                ctx.error(400,e.message);
            }
        }

    }
    public async create() {
        const { ctx } = this;
        try {
            this.validateUserInfo();
            this.validateUserCode();
            console.log(ctx.request.body);
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
    private validateUserCode(){
        const { ctx } = this;
        const data = ctx.request.body;
        const registerType = data.registerType;
        switch (registerType) {
            case RegisterTypeEnum.Normal:{
                //校验验证码是否正确
                ctx.helper.verifyImageCaptcha(data.captcha);
                break;
            }
            case RegisterTypeEnum.Email:{
                ctx.helper.verifyEmailCaptcha(data.captcha);
                break;
            }
            case RegisterTypeEnum.Phone:{
                ctx.helper.verifySmsCaptcha(data.captcha);
                break;
            }
            default:
                throw new Error('注册类型不存在')
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
