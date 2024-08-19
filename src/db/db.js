import { Sequelize } from 'sequelize';
import { DB } from '../config/environments.js'

const sequelize = new Sequelize(
  DB.DB_NAME,
  DB.DB_USER,
  DB.DB_PASSWORD,
  {
    host: DB.DB_HOST,
    dialect: DB.DB_DIALECT,
    port: DB.DB_PORT
  }
);

export default sequelize