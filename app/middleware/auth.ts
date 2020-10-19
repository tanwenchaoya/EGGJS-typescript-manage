const jwt = require('jsonwebtoken');
const isRequest = (actionRights:any, path:string, method:string)=>{
    const reg = new RegExp(`^${actionRights.rightsPath}(/[0-9]*)?$`, 'i');
    if(reg.test(path) && actionRights.rightsMethod === method) return true;
    if(actionRights.children){
        for(let i = 0; i < actionRights.children.length; i++){
            const item = actionRights.children[i];
            if(isRequest(item, path, method)) return true;
        }
    }
    return false;
}
const getActionRights = (ctx)=>{
    const userInfo = ctx.session.user;
    if(!userInfo) return null;
    const actionRights = userInfo.rightsTree.filter((rights:any)=>{
        if(rights.rightsType === 'action') return rights;
    });
    return actionRights[0];
};
let actionRights;
module.exports = (_options,app) => {
    return async function (ctx, next) {
        //拿到请求的路径和方法
        let curPath = ctx.url;
        const curMethod = ctx.request.method.toLowerCase();
        if(!curPath.startsWith('/api/v1')){
            // 不需要权限控制
            await next();
            return;
        }
        //拿到登录用户的请求权限
        if(!actionRights){
            actionRights = getActionRights(ctx);
        }
        if(!actionRights){
            ctx.error(400, '没有权限');
            return;
        }
        //截取路径相关的
        const idx = curPath.indexOf('?');
        if(idx !== -1){
            // /api/vi/users?page=1&pageSize=5; -> /api/vi/users
            curPath = curPath.substr(0, idx);
            console.log(curPath);
        }
        //如果请求路径出现在用户的请求列表中
        const flag = isRequest(actionRights, curPath, curMethod);
        if (flag){
            //获取token进行校验
            const token = ctx.cookies.get('token');
            if (token){
                try{
                    const res = await jwt.verify(token,app.config.keys);
                    console.log(res);
                    await next();
                }catch (e) {
                    ctx.error(400,'没有权限');
                }
            }else {
                ctx.error(400,'没有权限');
            }
        }else {
            ctx.error(400,'没有权限');
        }
    }
};