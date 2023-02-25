const mongoose = require("mongoose");

const nominalSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nominal", nominalSchema);
