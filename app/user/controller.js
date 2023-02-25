const User = require("./model");
const bcrypt = require("bcrypt");

module.exports = {
  viewLogin: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      if (req.session.user === null || req.session.user === undefined)
        res.render("admin/user/login", { title: "Login", alert });
      else res.redirect("/dashboard");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) throw new Error("User not found");
      if (user.status === "N") throw new Error("User not active");

      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) throw new Error("Password incorrect");

      req.session.user = {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      };

      res.redirect("/dashboard");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/");
    }
  },
};
