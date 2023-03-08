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
        // username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },

  status: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaction.findByIdAndUpdate(id, { status });

      req.flash("alertMessage", "Transaction Status successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/transaction");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/transaction");
    }
  },
};
