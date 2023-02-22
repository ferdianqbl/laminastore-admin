const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const voucherSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Game name is required"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  thumbnail: {
    type: String,
    default: null,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },
  nominals: [
    {
      type: Schema.Types.ObjectId,
      ref: "Nominal",
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Voucher", voucherSchema);
