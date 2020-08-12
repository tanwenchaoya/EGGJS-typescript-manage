import ImageCode from '../util/imageCode'
import EmailCode from '../util/emailCode'
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
};