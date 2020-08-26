const Core = require('@alicloud/pop-core');
let transporter;
export default {
    createTransporter() {
        // 创建发送者对象
        if (transporter){
            return transporter;
        }
        transporter=  new Core({
            accessKeyId: '<accessKeyId>',
            accessKeySecret: '<accessSecret>',
            endpoint: 'https://dysmsapi.aliyuncs.com',
            apiVersion: '2017-05-25'
        });
        return transporter;
    },
    createInfo(ctx,to:string){
        //创建邮件信息
        let code = Math.random().toString(16).slice(3,7).toUpperCase()
        let info = {
            "RegionId": "cn-hangzhou",
            "PhoneNumbers": to,
            "SignName": "xxx公司",//填写签名管理
            "TemplateCode": "123",//填写模板code
            "TemplateParam": `{code:"${code}"}`//发送的验证码
        }
        ctx.session.sms={
            code:code,
            expire:Date.now() + 60 * 1000 * 3
        }
        return info
    },
    async sendSms(ctx,to:string){
        //发送邮件
        const transporter = this.createTransporter();
        const info = this.createInfo(ctx,to);
        const requestOption = {
            method: 'POST'
        };
        return new Promise((resolve, reject) => {
            transporter.request('SendSms', info, requestOption).then((result) => {
               resolve(result);
            }, (ex) => {
                reject(ex);
            })
        })
    },
    verifySmsCaptcha(ctx,clientCode){
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