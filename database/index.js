const mongoose = require("mongoose");
const { database } = require("../config/env");

mongoose.set("strictQuery", true);
mongoose.connect(database.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

const conn = mongoose.connection;

module.exports = conn;
