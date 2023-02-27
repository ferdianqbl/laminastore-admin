const Transaction = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const transactions = await Transaction.find().populate("player");
      res.render("admin/transaction", {
        title: "Transaction",
        transactions,
        alert,
        username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },

  // viewCreate: async (req, res, next) => {
  //   try {
  //     const banks = await Bank.find();
  //     res.render("admin/payment/create", {
  //       title: "Add Payment",
  //       banks,
  //       username: req.session.user.username,
  //     });
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },

  // create: async (req, res, next) => {
  //   try {
  //     const { type, banks } = req.body;

  //     if (!type) throw new Error("Payment Type cannot be empty");
  //     if (!banks) throw new Error("Bank cannot be empty");

  //     await Payment.create({
  //       type,
  //       banks,
  //     });

  //     req.flash("alertMessage", "Payment successfully created");
  //     req.flash("alertStatus", "success");

  //     res.redirect("/payment");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },

  // viewEdit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const payment = await Payment.findById(id).populate(
  //       "banks",
  //       "owner bankName accountNumber"
  //     );

  //     if (!payment) throw new Error("Payment not found");

  //     const banks = await Bank.find();

  //     res.render("admin/payment/edit", {
  //       title: "Edit Payment",
  //       payment,
  //       banks,
  //       username: req.session.user.username,
  //     });
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },

  // edit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const { type, banks } = req.body;

  //     if (!type) throw new Error("Payment Type cannot be empty");
  //     if (!banks) throw new Error("Bank cannot be empty");

  //     await Payment.findByIdAndUpdate(id, {
  //       type,
  //       banks,
  //       timestamp: Date.now(),
  //     });

  //     req.flash("alertMessage", "Payment successfully updated");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/payment");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },

  // remove: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     await Payment.findByIdAndDelete(id);

  //     req.flash("alertMessage", "Payment successfully deleted");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/payment");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },

  // status: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;

  //     const payment = await Payment.findById(id);

  //     if (!payment) throw new Error("Payment not found");

  //     const status = payment.status === "active" ? "inactive" : "active";
  //     payment.status = status;
  //     await payment.save();

  //     req.flash("alertMessage", "Payment Status successfully updated");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/payment");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/payment");
  //   }
  // },
};
