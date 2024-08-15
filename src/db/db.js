import { Sequelize } from 'sequelize';
import { DB } from '../config/environments.js'

export const sequelize = new Sequelize(
  DB.DB_NAME,
  DB.DB_USER,
  DB.DB_PASSWORD,
  {
    host: DB.DB_HOST,
    dialect: DB.DB_DIALECT,
    port: DB.DB_PORT
  }
);

export const startDB = async () => {
  try {
    await sequelize.sync( {alter: false } );
  } catch (err) {
    console.error('Error starting database')
    console.error(err)
  }
}