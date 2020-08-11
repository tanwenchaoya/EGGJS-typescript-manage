import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  //自定义一个校验方法,校验的时候调用
/*  app.validator.addRule('myUsername', (_rule, value:string) => {
    if (value.length < 6){
      return "用户名至少有六位"
    }
  });*/

  router.get('/', controller.home.index);
  router.post('/register',controller.user.create)
};
