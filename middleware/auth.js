const Player = require("../app/player/model");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../config/env");

module.exports = {
  isLogin: (req, res, next) => {
    if (req.session.user === null || req.session.user === undefined) {
      req.flash("alertMessage", "Your session has expired, please login again");
      req.flash("alertStatus", "danger");
      res.redirect("/");
    } else {
      next();
    }
  },

  isLoginPlayer: async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ? req.headers.authorization.replace("Bearer ", "")
        : null;
      const data = jwt.verify(token, jwtKey.secret);
      const player = await Player.findById(data.player.id);

      if (!player) throw new Error();
      req.player = player;
      req.token = token;

      next();
    } catch (error) {
      res.status(401).json({
        message: "Not Authorized to access this page",
      });
    }
  },
};
