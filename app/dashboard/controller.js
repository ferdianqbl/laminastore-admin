const Transaction = require("../transaction/model");
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Player = require("../player/model");

module.exports = {
  index: async (req, res, next) => {
    try {
      const transactions = await Transaction.count();
      const vouchers = await Voucher.count();
      const categories = await Category.count();
      const players = await Player.count();

      res.render("index", {
        title: "Home",
        // username: req.session.user.username,
        transactions,
        vouchers,
        categories,
        players,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
