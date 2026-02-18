import dotenv from "dotenv";
import { resolve } from "node:path";
const NODE_CORS = process.env.NODE_ENV;
const envPaths = {
  production: `.production.env`,
  devolopment: `.devolopment.env`,
};

dotenv.config({ path: resolve(`config/${envPaths[NODE_CORS]}`) });


export const SECRET_ENCRYPTION_KEY = +process.env.SECRET_ACCESS_TOKEN;
export const SECRET_ENCRYPTION_ALGO = process.env.SECRET_ENCRYPTION_ALGO;
export const SECRET_IV_LENGTH = process.env.SECRET_IV_LENGTH;
export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN;
export const DB_URI = process.env.DB_URI;
export const PORT = process.env.PORT;
export const SALT = process.env.SALT;
