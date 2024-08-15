import 'dotenv/config';

export const PORT = process.env.SERVER_PORT;
export const DB = {
  DB_NAME: process.env.DATABASE,
  DB_USER: process.env.USER,
  DB_PASSWORD: process.env.PASSWORD,
  DB_HOST: process.env.HOST,
  DB_DIALECT: process.env.DIALECT,
  DB_PORT: process.env.PORT,
}