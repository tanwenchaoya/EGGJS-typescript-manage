import { Controller } from 'egg';
import addUserRules from "../validate/addUserRules";
const path = require('path');
const xlxs = require('node-xlsx');
const fs = require('fs');
export default class UsersController extends Controller {
    public async index() {
        const { ctx } = this;
        try{
            const res = await ctx.service.users.getUsersList(ctx.query);
            for (let key of res.users){
                delete key.dataValues.password
            }
            ctx.success(res);
        }catch (e) {
            ctx.error(400,'查找用户出错');
        }
    }
    public async createUser(){
        const {ctx} = this;
        const data = ctx.request.body;
        try{
            ctx.validate(addUserRules,data);
            const res = await ctx.service.users.createUser(data);
            console.log(res);
            ctx.success(res);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }
        }
    }
    public async deleteUser(){
        const {ctx} = this;
        const {id} = ctx.params;
        console.log(id);
        try{
            const data = await ctx.service.users.deleteUser(id);
            ctx.success(data);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }
        }
    }
    public async updateUser(){
        const {ctx} = this;
        const {id} = ctx.params;
        const obj = ctx.request.body;
        console.log(obj);
        try{
            // ctx.validate(addUserRules,obj);
            const res = await ctx.service.users.updateUser(id,obj);
            ctx.success(res);
        }catch (e) {
            if (e.error){
                ctx.error(400,e.error);
            }else {
                ctx.error(400,e.message);
            }
        }
    }
    public async uploadAvatar(){
        const {ctx} = this;
        //eggjs中药实现文件上传，需要配置一下
        const file = ctx.request.files[0];
        const newFileName=ctx.helper._md5(file.filename+Date.now())+path.extname(file.filename);
        const filePath = path.join('/public/upload',newFileName);
        console.log(filePath);
        const absFilePath = path.join(this.config.baseDir,'app',filePath);
        console.log(absFilePath);
        const readStrem=fs.readFileSync(file.filepath);
        fs.writeFileSync(absFilePath,readStrem)
        ctx.success(filePath);
    }
    public async importUsers(){
        const {ctx} = this;
        const file = ctx.request.files[0];
        //读取到的xlxs是这样的
        //[ { name: 'users', data: [ [Array], [Array], [Array] ] } ]
        let transaction:any;
        try{
            const xlsxRes = xlxs.parse(fs.readFileSync(file.filepath));
            const data = xlsxRes.length >0?xlsxRes[0]:null;
            const usersData = data?data.data:[];
            console.log(usersData);
            const colTitle = usersData[0];
            let users:Array<any> = [];
            transaction = await ctx.model.transaction();
            for (let i = 1;i<usersData.length;i++){
                let colValue = usersData[i];
                let user = {}
                for (let j = 0;j<colTitle.length;j++){
                    if (colValue[j] === undefined){
                        colValue[j] = null
                    }
                    user[colTitle[j]] = colValue[j];
                }
                console.log(user);
                await ctx.service.users.createUser(user);
                users.push(user);
            }
            await transaction.commit();
            ctx.success(users);
        }catch (e) {
            await transaction.rollback()
            ctx.error(500,e.message);
        }
    }
}
