module.exports=(app)=>{
    app.router.get('/api/v1/users',app.controller.users.index);
    app.router.post('/api/v1/users',app.controller.users.createUser);
    app.router.delete('/api/v1/users/:id',app.controller.users.deleteUser);
    app.router.put('/api/v1/users/:id',app.controller.users.updateUser);
    app.router.post('/api/v1/posts',app.controller.users.uploadAvatar);
    app.router.post('/api/v1/importUsers',app.controller.users.importUsers);
}