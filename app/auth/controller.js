const Player = require("../player/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../../config/env");

module.exports = {
  signup: async (req, res, next) => {
    try {
      const payload = req.body;

      const player = new Player({
        ...payload,
        avatar: req.file?.filename,
      });
      await player.save();
      delete player._doc.password;
      res.status(201).json({
        error: 0,
        message: "Player created successfully",
        data: player,
      });
    } catch (error) {
      if (error && error.name === "ValidationError")
        return res.status(422).json({
          error: 1,
          message: error.message,
          fields: error.errors,
        });

      next(error);
    }
  },
  login: (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({
        error: 1,
        message: "Email and password are required",
      });

    Player.findOne({ email })
      .then((player) => {
        if (!player)
          return res.status(404).json({
            error: 1,
            message: "Email is incorrect",
          });

        bcrypt.compare(password, player.password).then((result) => {
          if (!result)
            return res.status(404).json({
              error: 1,
              message: "Password is incorrect",
            });

          const token = jwt.sign(
            {
              id: player._id,
              email: player.email,
              name: player.name,
              avatar: player.avatar,
              username: player.username,
              phoneNumber: player.phoneNumber,
            },
            jwtKey.secret,
            { expiresIn: jwtKey.expiresIn }
          );

          res.status(200).json({
            error: 0,
            message: "Login successful",
            data: {
              token,
            },
          });
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: 1,
          message: error.message || "Internal server error",
        });

        next(error);
      });
  },
};
