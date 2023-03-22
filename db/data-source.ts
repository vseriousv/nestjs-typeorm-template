import { DataSource, DataSourceOptions } from 'typeorm';
const dotenv = require('dotenv');
dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  logging: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
