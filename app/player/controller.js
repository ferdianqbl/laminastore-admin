// const Player = require('./model');
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");

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
      const {
        accountUser,
        bankOwner,
        nominalId,
        voucherId,
        paymentId,
        bankId,
      } = req.body;

      const res_voucher = await Voucher.findById(voucherId)
        .select("_id name category thumbnail user")
        .populate("category")
        .populate("user");
      if (!res_voucher)
        return res.status(404).json({ message: "Voucher not found" });

      const res_nominal = await Nominal.findById(nominalId);
      if (!res_nominal)
        return res.status(404).json({ message: "Nominal not found" });

      const res_payment = await Payment.findById(paymentId);
      if (!res_payment)
        return res.status(404).json({ message: "Payment not found" });

      const res_bank = await Bank.findById(bankId);
      if (!res_bank) return res.status(404).json({ message: "Bank not found" });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
};
