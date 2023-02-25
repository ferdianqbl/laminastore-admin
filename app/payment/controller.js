const Payment = require("./model");
const Bank = require("../bank/model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const payments = await Payment.find().populate(
        "banks",
        "owner bankName accountNumber"
      );
      res.render("admin/payment", { title: "Payment", payments, alert });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewCreate: async (req, res, next) => {
    try {
      const banks = await Bank.find();
      res.render("admin/payment/create", { title: "Add Payment", banks });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  create: async (req, res, next) => {
    try {
      const { type, banks } = req.body;

      if (!type) throw new Error("Payment Type cannot be empty");
      if (!banks) throw new Error("Bank cannot be empty");

      await Payment.create({
        type,
        banks,
      });

      req.flash("alertMessage", "Payment successfully created");
      req.flash("alertStatus", "success");

      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findById(id).populate(
        "banks",
        "owner bankName accountNumber"
      );

      if (!payment) throw new Error("Payment not found");

      const banks = await Bank.find();

      res.render("admin/payment/edit", {
        title: "Edit Payment",
        payment,
        banks,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;

      if (!type) throw new Error("Payment Type cannot be empty");
      if (!banks) throw new Error("Bank cannot be empty");

      await Payment.findByIdAndUpdate(id, {
        type,
        banks,
        timestamp: Date.now(),
      });

      req.flash("alertMessage", "Payment successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/payment");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/payment");
    }
  },

  // remove: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     await Category.findByIdAndDelete(id);

  //     req.flash("alertMessage", "Category successfully deleted");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/category");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },
};
