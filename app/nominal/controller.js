const Nominal = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const nominals = await Nominal.find();
      res.render("admin/nominal", { title: "Nominal", nominals, alert });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/nominal/create", { title: "Add Nominal" });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  create: async (req, res, next) => {
    try {
      const { coinName, coinQuantity, price } = req.body;

      if (!coinName) throw new Error("Coin Name cannot be empty");
      if (!coinQuantity) throw new Error("Coin Quantity cannot be empty");
      if (!price) throw new Error("Price cannot be empty");

      const nominal = new Nominal({ coinName, coinQuantity, price });
      await nominal.save();

      req.flash("alertMessage", "Nominal successfully created");
      req.flash("alertStatus", "success");

      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
