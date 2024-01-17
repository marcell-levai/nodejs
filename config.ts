import * as dotenv from 'dotenv';
dotenv.config();

export const TOKEN_KEY = process.env.TOKEN_KEY;
export const MONGO_URL = process.env.MONGO_URL;
export const PORT = process.env.PORT || 4000;
export const AUTH_DEBUG = process.env.AUTH_DEBUG;