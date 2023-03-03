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

      const tax = res_nominal._doc.price * 0.1;
      const value = res_nominal._doc.price - tax;

      const payload = {
        voucherTopupHistory: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category
            ? res_voucher._doc.category.name
            : "",
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        paymentHistory: {
          owner: res_payment._doc.name,
          type: res_payment._doc.type,
          bankName: res_payment._doc.bankName,
          accountNumber: res_payment._doc.accountNumber,
        },
        name: bankOwner,
        accountName: accountUser,
        tax,
        value,
        // player:
        userHistory: {
          name: res_voucher._doc.user?._id,
          phone: res_voucher._doc.user?.phone,
        },
        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };

      res.status(201).json({ data: payload });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
};
