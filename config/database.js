import { config } from 'dotenv';
config();
import { Sequelize } from 'sequelize';

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDialect = process.env.DB_DIALECT;
const dbLoggingOn = process.env.DB_LOGGING_ON == 'true' ? true : false;
const dbAlterSchema = process.env.DB_ALTER_SCHEMA == 'true' ? console.log : false;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDialect,
  logging: dbLoggingOn,
  alter: dbAlterSchema
});