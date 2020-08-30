import { Service } from 'egg';

/**
 * Test Service
 */
export default class UserRole extends Service {

    /**
     * sayHi to you
     * @param name - your name
     */
    public async createUserRole(obj) {
        console.log(obj);
        const res = await this.ctx.model.UserRole.create(obj);
        return res;
    }
    public async deleteUserRole(userId,roleId){
        try{
            const res = await this.ctx.model.UserRole.destroy({
                where:{
                    userId:userId,
                    roleId:roleId
                }
            })
            if (res <= 0){
                throw new Error("删除角色失败");
            }
        }catch (e) {
            throw new Error("删除角色失败");
        }

    }
}
