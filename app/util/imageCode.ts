import svgCaptcha = require('svg-captcha');
export default {
    createImageCaptcha(ctx){
        const c = svgCaptcha.create({
            noise:3,
            background:'#ccc',
            ignoreChars:'0oOilI',
            width:120,
            height:60
        });
        console.log(c.text);
        //保存验证码到redis
        ctx.session.captcha={
            code:c.text,
            expire:Date.now() + 60 * 1000
        }
        ctx.body = c.data;
    },
    verifyImageCaptcha(ctx,clientCode){
        //从redis取出验证码信息
        const serviceCaptcha = ctx.session.captcha;
        let serverCode,serviceExprire;
        try {
            serverCode = serviceCaptcha.code.toLowerCase();
            serviceExprire = serviceCaptcha.expire;
        }catch (e) {
            //不论验证成功或失败都需要重新获取验证码，只能用一次
            ctx.session.captcha = null;
            throw new Error("请重新获取验证码");
        }
        console.log(serverCode.toLowerCase(), clientCode);
        if (Date.now()>serviceExprire){
            //不论验证成功或失败都需要重新获取验证码，只能用一次
            ctx.session.captcha = null;
            throw new Error("验证码过期");
        }else if (serverCode !== clientCode){
            //不论验证成功或失败都需要重新获取验证码，只能用一次
            ctx.session.captcha = null;
            throw new Error("验证码错误");
        }
        ctx.session.captcha = null;
    }
}