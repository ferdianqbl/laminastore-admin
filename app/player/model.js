const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Name is required"],
    },
    username: {
      type: String,
      require: [true, "Username is required"],
      maxlength: [20, "Username cannot be more than 20 characters"],
      minlength: [5, "Username cannot be less than 5 characters"],
      unique: true,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [8, "Password cannot be less than 8 characters"],
      maxlength: [20, "Password cannot be more than 20 characters"],
    },
    phoneNumber: {
      type: String,
      require: [true, "Phone Number is required"],
      maxlength: [13, "Phone Number cannot be more than 13 characters"],
      minlength: [10, "Phone Number cannot be less than 10 characters"],
    },
    avatar: {
      type: String,
    },
    fileName: { type: String },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["Y", "N"],
      default: "Y",
    },
    favorite: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
