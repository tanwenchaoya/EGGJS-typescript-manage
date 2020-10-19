module.exports = (app)=>{
    app.router.post('/api/v1/roleRights', app.controller.roleRights.create);
    app.router.delete('/api/v1/roleRights/:roleId', app.controller.roleRights.destroy);
}
