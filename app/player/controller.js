// const Player = require('./model');
const Voucher = require("../voucher/model");

module.exports = {
  landingPage: async (req, res, next) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Something went wrong in the server",
      });
    }
  },
};
