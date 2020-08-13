import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    username:'root',
    password:'root',
    port: 3306,
    database: 'system',
    timezone:'+8:00' //时区为东八区
  };
  config.security = {
    csrf:{
      enable:false
    }
  };
  config.smtp = {
    host:"smtp.qq.com",
    port: 465,
    user: '1781104182@qq.com', // 发送邮件的邮箱
    pass: 'meheebojrvlbbcbh', // 授权码
  };
  config.redis = {
    client: {
      host: '127.0.0.1',
      port: 6379,
      password: '',
      db: 0
    },
    agent:true
  };
  return config;
};
