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

      const transactions = await Transaction.find();
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
