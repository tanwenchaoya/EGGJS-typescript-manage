import { Service } from 'egg';
export default class Users extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async getUsers() {
        return await this.ctx.model.User.findAll();
    }
}
