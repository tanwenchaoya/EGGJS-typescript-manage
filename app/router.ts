import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  require('./router/code')(app);
  require('./router/account')(app);
  require('./router/user')(app);
  router.get('/', controller.home.index);
  //在eggjs中提供了一种对restful的约定，只要按照一定的写controller中方法的名字，那么就可以不用在路由中写很多的路径
  router.resources('roles', '/api/v1/roles', controller.roles);
  app.router.post('/api/v1/userRoles',app.controller.userRole.create);
  app.router.delete('/api/v1/userRoles:userId',app.controller.userRole.destroy);
};
