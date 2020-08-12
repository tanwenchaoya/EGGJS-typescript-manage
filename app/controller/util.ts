import { Controller } from 'egg';

export default class UtilController extends Controller {

    public async createImageCode() {
        const { ctx } = this;
        //生成验证码
        ctx.helper.createImageCaptcha()
    }
}
