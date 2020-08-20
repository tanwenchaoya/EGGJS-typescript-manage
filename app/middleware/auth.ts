const jwt = require('jsonwebtoken');
module.exports = (options,app) => {
    return async function (ctx, next) {
      //获取需要权限控制的路由
        const authUrls = options.authUrls;
        //判断是否需要权限控制
        if (authUrls.includes(ctx.url)){
            // const token = ctx.get('authorization');
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
             await next();
        }

    }
};