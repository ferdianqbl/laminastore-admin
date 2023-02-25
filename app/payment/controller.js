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

  // viewEdit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const category = await Category.findById(id);

  //     if (!category) throw new Error("Category not found");

  //     res.render("admin/category/edit", { title: "Edit Category", category });
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },

  // edit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const { name } = req.body;
  //     if (!name) throw new Error("Name cannot be empty");

  //     const isCategoryExist = await Category.find({
  //       name: name.charAt(0).toUpperCase() + name.slice(1).toLowerCase(),
  //     });
  //     if (isCategoryExist.length > 0)
  //       throw new Error("Category already exist, delete the old one first");

  //     const timestamp = Date.now();
  //     await Category.findByIdAndUpdate(id, {
  //       name,
  //       timestamp,
  //     });

  //     req.flash("alertMessage", "Category successfully updated");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/category");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/category");
  //   }
  // },

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
