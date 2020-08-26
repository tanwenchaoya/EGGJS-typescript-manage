module.exports=(app)=>{
    app.router.post('/register',app.controller.user.create);
    app.router.post('/login',app.controller.user.login);
    app.router.get('/github',app.controller.github.githubLogin);
    //当用户同意授权后，就会去访问这个地址，这个地址是我们当初在github填写授权信息时候指定的
    app.router.get('/github/callback',app.controller.github.getAccessToken);
}