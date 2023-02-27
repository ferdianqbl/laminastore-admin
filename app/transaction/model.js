const mongoose = require("mongoose");
const { Schema } = mongoose;

const transactionSchema = new mongoose.Schema(
  {
    voucherTopupHistory: {
      gameName: { type: String, require: [true, "Game Name is required"] },
      category: { type: String, require: [true, "Game Category is required"] },
      thumbnail: { type: String },
      coinName: { type: String, require: [true, "Coin Game Name is required"] },
      coinQuantity: {
        type: String,
        require: [true, "Coin  Game Quantity is required"],
      },
      price: { type: Number },
    },
    paymentHistory: {
      owner: { type: String, require: [true, "Owner is required"] },
      type: { type: String, require: [true, "Payment Type is required"] },
      bankName: { type: String, require: [true, "Payment Bank is required"] },
      accountNumber: {
        type: String,
        require: [true, "Account Number is required"],
      },
    },
    userHistory: {
      name: { type: String, require: [true, "Player Name is required"] },
      phone: {
        type: String,
        require: [true, "Player Phone is required"],
        maxlength: [
          13,
          "Phone cannot be more than 13 characters and less than 10 characters",
        ],
        minlength: [
          10,
          "Phone cannot be less than 10 characters and more than 13 characters",
        ],
      },
    },
    name: {
      type: String,
      require: [true, "Name is required"],
      maxlength: [
        225,
        "Name cannot be more than 225 characters and less than 3 characters",
      ],
      minlength: [
        3,
        "Name cannot be less than 3 characters and more than 225 characters",
      ],
    },
    accountName: {
      type: String,
      require: [true, "Account Name is required"],
      maxlength: [
        225,
        "Account Name cannot be more than 225 characters and less than 3 characters",
      ],
      minlength: [
        3,
        "Account Name cannot be less than 3 characters and more than 225 characters",
      ],
    },
    tax: {
      type: Number,
      default: 0,
    },
    value: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    player: {
      type: Schema.Types.ObjectId,
      ref: "Player",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", transactionSchema);
