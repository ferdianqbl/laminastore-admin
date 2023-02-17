const Category = require("./model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.render("admin/category", { title: "Category", categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewCreate: async (req, res, next) => {
    try {
      res.render("admin/category/create", { title: "Add Category" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res, next) => {
    try {
      const { name } = req.body;
      const category = new Category({ name });
      await category.save();
      res.redirect("/category");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  viewEdit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      if (!category)
        return res.status(404).json({ error: "Category not found" });

      res.render("admin/category/edit", { title: "Edit Category", category });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  edit: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const timestamp = Date.now();
      const categoryUpdated = await Category.findByIdAndUpdate(id, {
        name,
        timestamp,
      });

      if (!categoryUpdated)
        return res.status(404).json({ error: "Category not found" });

      res.redirect("/category");
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
