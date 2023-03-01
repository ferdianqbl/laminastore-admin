const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, ".."),
  _port: process.env.PORT,
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
  },
  serviceName: process.env.SERVICE_NAME,
  mode: process.env.MODE,
  jwtKey: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
};
