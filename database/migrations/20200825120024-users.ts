'use strict';
import {QueryInterface} from 'sequelize';
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface:QueryInterface, Sequelize) => {
    const {BOOLEAN,STRING} = Sequelize;
    await queryInterface.addColumn('users', 'user_state',{
      type: BOOLEAN,
      allowNull:true,
      unique:false,
      defaultValue:true

    });
    await queryInterface.addColumn('users', 'avatar_url',{
      type: STRING,
      allowNull:true,
      unique:false,
      defaultValue:'/public/logo.png'

    });
    await queryInterface.changeColumn('users', 'github',{
      type: BOOLEAN,
      allowNull:true,
      unique:false,
      defaultValue:false

    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async (queryInterface:QueryInterface) => {
    await queryInterface.dropTable('users');
  },
};