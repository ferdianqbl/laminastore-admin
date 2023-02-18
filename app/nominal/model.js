const mongoose = require("mongoose");

const nominalSchema = new mongoose.Schema({
  coinName: {
    type: String,
    require: [true, "Coin name is required"],
  },
  coinQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Nominal", nominalSchema);
