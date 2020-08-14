import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  router.get('/ImageCode',controller.util.createImageCode);
  router.get('/emailCode',controller.util.emailCode);
  router.get('/phoneCode',controller.util.phoneCode);
  router.post('/register',controller.user.create);
  router.post('/login',controller.user.login);
  router.get('/users',controller.users.index);
};
