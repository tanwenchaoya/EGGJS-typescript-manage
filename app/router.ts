import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  require('./router/code')(app);
  require('./router/account')(app);
  router.get('/', controller.home.index);
  router.get('/api/v1/users',controller.users.index);
  router.post('/api/v1/users',controller.users.createUser);

};
