import { Sequelize } from '@sequelize/core';
import { MySqlDialect } from '@sequelize/mysql';
import 'dotenv/config';

const sequelize = new Sequelize({
  dialect: MySqlDialect,
  database: process.env.database,
  user: process.env.user,
  password: process.env.password,
  host: process.env.host,
  port: 3306,
});

export default sequelize;


