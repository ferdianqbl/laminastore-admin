const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");

const { unlinkSync, existsSync } = require("fs");
const { rootPath } = require("../../config/env");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const vouchers = await Voucher.find()
        .populate("category", "name")
        .populate("nominals", "coinName coinQuantity price");

      res.render("admin/voucher", {
        title: "Voucher",
        vouchers,
        alert,
        username: req.session.user.username,
      });
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
        username: req.session.user.username,
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

  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id)
        .populate("category", "name")
        .populate("nominals", "coinName coinQuantity price");
      const categories = await Category.find();
      const nominals = await Nominal.find();

      if (!voucher) throw new Error("Voucher not found");

      res.render("admin/voucher/edit", {
        title: "Edit Voucher",
        voucher,
        categories,
        nominals,
        username: req.session.user.username,
      });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;
      console.log(req.body);
      if (!name) throw new Error("Name cannot be empty");
      if (!category) throw new Error("Category cannot be empty");
      if (!nominals) throw new Error("Nominal cannot be empty");

      const voucher = await Voucher.findById(id);

      if (req.file) {
        if (
          existsSync(`${rootPath}/public/uploads/voucher/${voucher.thumbnail}`)
        )
          unlinkSync(`${rootPath}/public/uploads/voucher/${voucher.thumbnail}`);
        voucher.thumbnail = req.file.filename;
      }

      voucher.name = name;
      voucher.category = category;
      voucher.nominals = nominals;
      voucher.timestamp = Date.now();
      await voucher.save();

      req.flash("alertMessage", "Voucher successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findByIdAndRemove(id);

      if (existsSync(`${rootPath}/public/uploads/voucher/${voucher.thumbnail}`))
        unlinkSync(`${rootPath}/public/uploads/voucher/${voucher.thumbnail}`);

      req.flash("alertMessage", "Voucher successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },

  status: async (req, res, next) => {
    try {
      const { id } = req.params;

      const voucher = await Voucher.findById(id);

      const status = voucher.status === "active" ? "inactive" : "active";

      voucher.status = status;
      voucher.timestamp = Date.now();
      await voucher.save();

      req.flash("alertMessage", "Voucher Status successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/voucher");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
};
