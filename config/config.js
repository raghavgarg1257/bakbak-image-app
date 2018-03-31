import dotenv from 'dotenv';

// injecting environment variables
dotenv.config();

export default {
  env: process.env.NODE_ENV || 'development',
  api: {
    host: process.env.API_HOST,
    port: process.env.API_PORT,
  },
};
