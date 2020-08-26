const nodemailer = require("nodemailer");
let transporter;
export default {
    createTransporter(ctx) {
        // 创建发送者对象
        if (transporter){
            return transporter;
        }
        transporter= nodemailer.createTransport({
            host: ctx.app.config.smtp.host,
            port: ctx.app.config.smtp.port,
            secure: true, // true for 465, false for other ports
            auth: {
                user: ctx.app.config.smtp.user, // 发送邮件的邮箱
                pass: ctx.app.config.smtp.pass, // 授权码
            },
        });
        return transporter;
    },
    createInfo(ctx,to:string){
        //创建邮件信息
        let code = Math.random().toString(16).slice(3,7).toUpperCase()
        let info = {
            from: '1781104182@qq.com', // sender address
            to: to, // list of receivers
            subject: "Hello ✔", // Subject line
            text: `你正在注册xxx管理系统，你的验证码是${code}`, // plain text body
        }
        ctx.session.emailCode={
            code:code,
            expire:Date.now() + 60 * 1000 * 3
        }
        return info
    },
    async sendEmail(ctx,to:string){
        //发送邮件
        const transporter = this.createTransporter(ctx);
        const info = this.createInfo(ctx,to);
        return new Promise((resolve, reject) => {
            transporter.sendMail(info,(err,data)=>{
                if (err){
                    reject(err);
                }else {
                   resolve(data);
                }
            })
        })
    },
    verifyEmailCaptcha(ctx,clientCode){
        //从redis取出验证码信息
        const serviceCaptcha = ctx.session.emailCode;
        let serverCode,serviceExprire;
        try {
            serverCode = serviceCaptcha.code;
            serviceExprire = serviceCaptcha.expire;
        }catch (e) {
            throw new Error("请重新获取验证码");
        }
        if (Date.now()>serviceExprire){
            throw new Error("验证码过期");
        }else if (serverCode !== clientCode){
            throw new Error("验证码错误");
        }
        ctx.session.emailCode = null;
    }
}