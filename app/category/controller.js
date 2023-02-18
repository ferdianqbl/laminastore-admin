const Category = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      const alert = {
        message: alertMessage,
        status: alertStatus,
      };

      const categories = await Category.find();
      res.render("admin/category", { title: "Category", categories, alert });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/category/create", { title: "Add Category" });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  create: async (req, res, next) => {
    try {
      const { name } = req.body;

      if (!name) throw new Error("Name cannot be empty");

      const category = new Category({ name });
      await category.save();

      req.flash("alertMessage", "Category successfully created");
      req.flash("alertStatus", "success");

      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category) throw new Error("Category not found");

      res.render("admin/category/edit", { title: "Edit Category", category });
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      if (!name) throw new Error("Name cannot be empty");

      const timestamp = Date.now();
      await Category.findByIdAndUpdate(id, {
        name,
        timestamp,
      });

      req.flash("alertMessage", "Category successfully updated");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },

  remove: async (req, res, next) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete(id);

      req.flash("alertMessage", "Category successfully deleted");
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", error.message);
      req.flash("alertStatus", "danger");
      res.redirect("/category");
    }
  },
};
