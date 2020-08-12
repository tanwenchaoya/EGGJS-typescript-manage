import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
/*    sequelize : {
        enable: true,
        package: 'egg-sequelize',
    }*/
    sequelize : {
        enable: true,
        package: 'egg-sequelize-ts'
    },
    validate : {
        enable: true,
        package: 'egg-validate',
    },
    sessionRedis : {
        enable: true,
        package: 'egg-session-redis',
    },
    redis :{
        enable: true,
        package: 'egg-redis',
    }
};

export default plugin;
