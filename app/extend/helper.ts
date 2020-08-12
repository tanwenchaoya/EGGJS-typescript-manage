import ImageCode from '../util/imageCode'
module.exports = {
    createImageCaptcha(){
        return ImageCode.createImageCaptcha(this.ctx)
    },
    verifyImageCaptcha(clientCode){
        return ImageCode.verifyImageCaptcha(this.ctx,clientCode)
    }
};