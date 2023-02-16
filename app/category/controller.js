module.exports = {
  index: async (req, res, next) => {
    try {
      res.render("index", { title: "Express Test" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
