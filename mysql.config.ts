import dotenv from "dotenv";

dotenv.config();

export const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_ROOT_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  port: process.env.MYSQL_PORT
    ? parseInt(process.env.MYSQL_PORT, 10)
    : undefined,
};
