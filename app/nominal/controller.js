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
      res.render("admin/nominal", {
        title: "Nominal",
        nominals,
        alert,
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/nominal/create", {
        title: "Add Nominal",
        // username: req.session.user.username,
      });
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

      const isNominalExist = await Nominal.find({ coinName, coinQuantity });
      if (isNominalExist.length > 0)
        throw new Error(
          "Nominal already exist with same coin name and coin quantity"
        );

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

  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findById(id);

      if (!nominal) throw new Error("Nominal not found");

      res.render("admin/nominal/edit", {
        title: "Edit nominal",
        nominal,
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;

      if (!coinName) throw new Error("Name cannot be empty");
      if (!coinQuantity) throw new Error("Coin Quantity cannot be empty");
      if (!price) throw new Error("Price cannot be empty");

      const isNominalExist = await Nominal.find({ coinName, coinQuantity });
      if (isNominalExist.length > 0)
        throw new Error(
          "Nominal already exist with same coin name and coin quantity, delete the old one first"
        );

      await Nominal.findByIdAndUpdate(id, {
        coinName,
        coinQuantity,
        price,
      });

      req.flash("alertMessage", "Nominal successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Nominal.findByIdAndDelete(id);

      req.flash("alertMessage", "Nominal successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
};
