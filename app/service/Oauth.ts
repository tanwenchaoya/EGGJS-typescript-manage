import { Service } from 'egg';
import {User} from '../model/user'
export default class Oauth extends Service{
    public async getUser({id,provider}) {
        const data =  await this.ctx.model.Oauths.findOne({
            where:{
                uid:id,
                provider:provider
            },
            include:[
                {
                    model:User
                }
            ]
        });
        try{
            return data!.dataValues.user!.dataValues;
        }catch (e) {
            throw new Error("授权用户不存在");
        }
    }
    public async creatOauth(data){
        return await this.ctx.model.Oauths.create(data);
    }
}
