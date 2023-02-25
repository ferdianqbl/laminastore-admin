module.exports = {
  index: async (req, res, next) => {
    try {
      res.render("index", {
        title: "Home",
        username: req.session.user.username,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
