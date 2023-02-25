const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      require: [true, "Owner is required"],
    },
    bankName: {
      type: String,
      require: [true, "Bank Name is required"],
    },
    accountNumber: {
      type: String,
      require: [true, "Account Number is required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bank", bankSchema);
