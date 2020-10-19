import { Controller } from 'egg';
const queryString = require('querystring');
const jwt = require('jsonwebtoken');
import { v4 as uuidv4 } from 'uuid';
export default class giController extends Controller {
    //https://github.com/login/oauth/authorize
    //https://docs.github.com/en/developers/apps/authorizing-oauth-apps
    //跳转到授权界面
    public async githubLogin(){
        const { ctx } = this;
        const baseUrl= 'https://github.com/login/oauth/authorize';
        const data={
            client_id:'9cfb3403116721b33fe5',
            scope:'user'
        }
        const url = baseUrl+'?'+queryString.stringify(data);
        console.log(url);
        ctx.redirect(url);
    }
    //同意授权后根据code换取access_token
    public async getAccessToken() {
        const { ctx } = this;
        const {code} = ctx.query;
        const baseUrl='https://github.com/login/oauth/access_token';
        const data = {
            client_id:'9cfb3403116721b33fe5',
            code:code,
            client_secret:'69e22df368de86a66bc46989d6c8ebb147733c3f'
        }
        console.log(data);
        const res = await ctx.curl(baseUrl,{
            method:'POST',
            data:data,
            dataType:'json',
            headers:{
                'Content-Type':'application/json',
                'Accept': 'application/json'
            }
        })
        const accessToken = res.data.access_token;
        await this.getGithubUserInfo(accessToken);
    }
    //拿着令牌去资源服务器获取数据
    private async getGithubUserInfo(accessToken){
        const { ctx } = this;
        const baseUrl = 'https://api.github.com/user';
        const url = `${baseUrl}?access_token=${accessToken}`;
        const res = await ctx.curl(url,{
            method:'GET',
        })
        //获取到数据后多表查询关联的用户进行登录
        const data = JSON.parse(res.data);
        data.provider = 'github';
        console.log(data);
        await this.getReleUser(data,accessToken)
    }
    //获取到数据后来进行对表的操作
    private async getReleUser(data,accessToken){
        const {ctx} = this;
        try{
            const res = await ctx.service.oauth.getUser(data);
            const token = jwt.sign(res, this.app.config.keys);
            ctx.cookies.set('token',token,{
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false
            })
            // ctx.body=res;
            ctx.redirect('http://127.0.0.1:8080/admin');
        }catch (e) {
            //如果是第一次三方登录，就需要创建一个用户
            //使用uuid来生产一个唯一的用户名
            const userInfo = {
                username:uuidv4(),
                password:'1234567',
                github:'1'
            }
            const newUser=await ctx.service.user.createUser(userInfo);
            console.log(newUser);
            //保存信息到oauths表
            const oauthInfo={
                access_token:accessToken,
                provider:data.provider,
                uid:data.id,
                user_id:newUser!.id
            }
            await ctx.service.oauth.creatOauth(oauthInfo);
            const token = jwt.sign(newUser, this.app.config.keys);
            ctx.cookies.set('token',token,{
                path:'/',
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: false
            })
            // ctx.body=res;
            ctx.redirect('http://127.0.0.1:8080/admin');
        }
    }

}