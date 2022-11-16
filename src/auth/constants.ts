require('dotenv').config();
export const jwtConstants = {
  secret: process.env.SECRET_KEY,
  adminSecret: process.env.SECRET_KEY_ADMIN
};