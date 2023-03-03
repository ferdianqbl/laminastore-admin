// const Player = require('./model');
const Voucher = require("../voucher/model");
const Category = require("../category/model");

module.exports = {
  landingPage: async (req, res, next) => {
    try {
      const voucher = await Voucher.find()
        .select("_id name status category thumbnail")
        .populate("category");

      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  },
  detailPage: async (req, res, next) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findById(id)
        // .select("_id name status category thumbnail")
        .populate("category")
        .populate("nominals")
        .populate("user", "_id name phone");

      if (!voucher)
        return res.status(404).json({ message: "Voucher not found" });

      res.status(200).json({ data: voucher });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  },
  category: async (req, res, next) => {
    try {
      const categories = await Category.find();
      res.status(200).json({ data: categories });
    } catch (error) {
      res.status(500).json({
        message: error.message || "Internal Server Error",
      });
    }
  },
  checkout: async (req, res, next) => {
    try {
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
};
