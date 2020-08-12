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
  };
  config.security = {
    csrf:{
      enable:false
    }
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
