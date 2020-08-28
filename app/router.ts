import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  require('./router/code')(app);
  require('./router/account')(app);
  router.get('/', controller.home.index);
  router.get('/api/v1/users',controller.users.index);
  router.post('/api/v1/users',controller.users.createUser);
  router.delete('/api/v1/users/:id',controller.users.deleteUser);
  router.put('/api/v1/users/:id',controller.users.updateUser);
  router.post('/api/v1/posts',controller.users.uploadAvatar);
  router.post('/api/v1/importUsers',controller.users.importUsers);
};
