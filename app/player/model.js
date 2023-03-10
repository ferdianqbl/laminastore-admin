const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minlength: [6, "Password cannot be less than 8 characters"],
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

// Username validation
playerSchema.path("username").validate(async function (value) {
  try {
    const count = await this.model("Player").countDocuments({
      username: value,
    });

    return !count;
  } catch (error) {
    throw new Error(error);
  }
}, "Username already exists");

// Email validation
playerSchema.path("email").validate(async function (value) {
  try {
    const count = await this.model("Player").countDocuments({ email: value });
    return !count;
  } catch (error) {
    throw new Error(error);
  }
}, "Email already exists");

// Hash password before saving to database
playerSchema.pre("save", function (next) {
  const player = this;
  if (!player.isModified("password")) return next();
  bcrypt.hash(player.password, 10, (err, hash) => {
    if (err) return next(err);
    player.password = hash;
    next();
  });
});

module.exports = mongoose.model("Player", playerSchema);
