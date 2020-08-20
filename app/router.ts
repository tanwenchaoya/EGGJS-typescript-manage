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
  router.get('/github',controller.github.githubLogin);
  //当用户同意授权后，就会去访问这个地址，这个地址是我们当初在github填写授权信息时候指定的
  router.get('/github/callback',controller.github.getAccessToken);
};
