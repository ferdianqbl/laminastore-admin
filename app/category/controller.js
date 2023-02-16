module.exports = {
  index: async (req, res, next) => {
    try {
      res.render("admin/category", { title: "Category" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
