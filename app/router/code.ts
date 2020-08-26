module.exports=(app)=>{
    app.router.get('/ImageCode',app.controller.util.createImageCode);
    app.router.get('/emailCode',app.controller.util.emailCode);
    app.router.get('/phoneCode',app.controller.util.phoneCode);
}