import ImageCode from '../util/imageCode'
import EmailCode from '../util/emailCode'
import PhoneCode from '../util/phoneCode'
const crypto = require('crypto');
module.exports = {
    createImageCaptcha(){
        return ImageCode.createImageCaptcha(this.ctx)
    },
    verifyImageCaptcha(clientCode){
        return ImageCode.verifyImageCaptcha(this.ctx,clientCode)
    },
    async sendEmail(to:string){
        return await EmailCode.sendEmail(this.ctx,to);
    },
    verifyEmailCaptcha(clientCode){
        return EmailCode.verifyEmailCaptcha(this.ctx,clientCode)
    },
    async sendSms(to:string){
        return await PhoneCode.sendSms(this.ctx,to);
    },
    verifySmsCaptcha(clientCode){
        return PhoneCode.verifySmsCaptcha(this.ctx,clientCode)
    },
    _md5(password) {
        // 1.指定加密方式
        const md5 = crypto.createHash('md5')
        // 2.指定需要加密的内容和加密之后输出的格式
        const hash = md5.update(password) // 指定需要加密的内容
            .digest('hex'); // 指定加密之后输出的格式
        return hash;
    },
    generatePwd(password){
        password = password + this.config.keys;
        let hash = this._md5(password);
        return hash;
    }
};