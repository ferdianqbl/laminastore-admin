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
      res.render("admin/bank", { title: "Bank", banks, alert });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/bank/create", { title: "Add Bank" });
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
      res.render("admin/bank/edit", { title: "Edit bank", bank });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/bank");
    }
  },
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
