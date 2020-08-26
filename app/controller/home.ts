import { Controller } from 'egg';
import {User} from '../model/user'
export default class HomeController extends Controller {
  public async index() {
    const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    // ctx.body = await ctx.model.User.findAll();
    const data = await ctx.model.Oauths.findOne({
      where:{
        id:1
      },
      include:[
        {model:User}
      ]
    })
    console.log(data!.dataValues);
  }
}
