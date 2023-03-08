const Bank = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };
      const banks = await Bank.find();
      res.render("admin/bank", {
        title: "Bank",
        banks,
        alert,
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/bank/create", {
        title: "Add Bank",
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  create: async (req, res, next) => {
    try {
      const { owner, bankName, accountNumber } = req.body;
      if (!owner) throw new Error("Owner cannot be empty");
      if (!bankName) throw new Error("Bank name cannot be empty");
      if (!accountNumber) throw new Error("Account number cannot be empty");

      await Bank.create({
        owner,
        bankName,
        accountNumber,
      });

      req.flash("alertMessage", "Bank successfully created");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findById(id);
      if (!bank) throw new Error("Bank not found");
      res.render("admin/bank/edit", {
        title: "Edit bank",
        bank,
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { owner, bankName, accountNumber } = req.body;

      if (!owner) throw new Error("Owner cannot be empty");
      if (!bankName) throw new Error("Bank name cannot be empty");
      if (!accountNumber) throw new Error("Account number cannot be empty");

      await Bank.findByIdAndUpdate(id, {
        owner,
        bankName,
        accountNumber,
      });
      req.flash("alertMessage", "Bank successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Bank.findByIdAndDelete(id);
      req.flash("alertMessage", "Bank successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/bank");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
};
