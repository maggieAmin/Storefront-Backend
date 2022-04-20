import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

let client;
console.log('ENV=' + process.env.ENV);

if (process.env.ENV === 'dev') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

if (process.env.ENV === 'test') {
  client = new Pool({
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_TEST_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  });
}

export default client;
