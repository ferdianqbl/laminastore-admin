const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const vouchers = await Voucher.find();
      res.render("admin/voucher", { title: "Voucher", vouchers, alert });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      const categories = await Category.find();
      const nominals = await Nominal.find();

      if (!categories) throw new Error("Category not found");
      if (!nominals) throw new Error("Nominal not found");

      res.render("admin/voucher/create", {
        title: "Add Voucher",
        categories,
        nominals,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/Voucher");
    }
  },
  create: async (req, res, next) => {
    try {
      const { name, category, nominals } = req.body;

      if (!name) throw new Error("Name cannot be empty");
      if (!category) throw new Error("Category cannot be empty");
      if (!nominals) throw new Error("Nominal cannot be empty");

      const voucher = await Voucher.create({
        name,
        category,
        nominals,
      });
      if (req.file) voucher.thumbnail = req.file.filename;

      await voucher.save();

      req.flash("alertMessage", "Voucher successfully created");
      req.flash("alertStatus", "success");

      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  // viewEdit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const nominal = await Nominal.findById(id);

  //     if (!nominal) throw new Error("Nominal not found");

  //     res.render("admin/nominal/edit", { title: "Edit nominal", nominal });
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },

  // edit: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     const { coinName, coinQuantity, price } = req.body;

  //     if (!coinName) throw new Error("Name cannot be empty");
  //     if (!coinQuantity) throw new Error("Coin Quantity cannot be empty");
  //     if (!price) throw new Error("Price cannot be empty");

  //     const isNominalExist = await Nominal.find({ coinName, coinQuantity });
  //     if (isNominalExist.length > 0)
  //       throw new Error(
  //         "Nominal already exist with same coin name and coin quantity, delete the old one first"
  //       );

  //     const timestamp = Date.now();
  //     await Nominal.findByIdAndUpdate(id, {
  //       coinName,
  //       coinQuantity,
  //       price,
  //       timestamp,
  //     });

  //     req.flash("alertMessage", "Nominal successfully updated");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },

  // remove: async (req, res, next) => {
  //   try {
  //     const { id } = req.params;
  //     await Nominal.findByIdAndDelete(id);

  //     req.flash("alertMessage", "Nominal successfully deleted");
  //     req.flash("alertStatus", "success");
  //     res.redirect("/nominal");
  //   } catch (error) {
  //     req.flash("alertMessage", error.message);
  //     req.flash("alertStatus", "danger");
  //     res.redirect("/nominal");
  //   }
  // },
};
