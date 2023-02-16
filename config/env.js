const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  _port: process.env.PORT,
  database: {
    url: process.env.DB_URL,
    name: process.env.DB_NAME,
  },
  serviceName: process.env.SERVICE_NAME,
  mode: process.env.MODE,
};
