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
};
