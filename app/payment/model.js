const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      require: [true, "Payment Type is required"],
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    banks: [
      {
        type: Schema.Types.ObjectId,
        ref: "Bank",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
