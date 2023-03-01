const Player = require("../player/model");

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
};
