// const Player = require('./model');
const Voucher = require("../voucher/model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const Payment = require("../payment/model");
const Bank = require("../bank/model");
const Transaction = require("../transaction/model");

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
          owner: res_bank._doc.owner,
          type: res_payment._doc.type,
          bankName: res_bank._doc.bankName,
          accountNumber: res_bank._doc.accountNumber,
        },
        name: bankOwner,
        accountName: accountUser,
        tax,
        value,
        player: req.player._id,
        userHistory: {
          name: res_voucher._doc.user?.name,
          phone: res_voucher._doc.user?.phone,
        },
        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id,
      };

      const transaction = await Transaction.create(payload);

      res.status(201).json({ data: transaction });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
  history: async (req, res, next) => {
    try {
      const { status = "" } = req.query;
      // console.log(status.length);
      let criteria = {};
      if (status)
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: "i" },
        };

      if (req.player._id)
        criteria = {
          ...criteria,
          player: req.player._id,
        };

      const history = await Transaction.find(criteria);

      const total_value = await Transaction.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
            value: { $sum: "$value" },
          },
        },
      ]);

      res.status(200).json({
        total_value: total_value.length > 0 ? total_value[0].value : 0,
        dataLength: history.length,
        data: history,
      });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
  historyDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const history = await Transaction.findById(id);

      if (!history)
        return res.status(404).json({ message: "History not found" });

      res.status(200).json({ data: history });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
  dashboard: async (req, res, next) => {
    try {
      const categoryValueCount = await Transaction.aggregate([
        { $match: { player: req.player._id } },
        {
          $group: {
            _id: "$category",
            value: { $sum: "$value" },
          },
        },
      ]);

      const categories = await Category.find();

      categories.forEach((category) => {
        categoryValueCount.forEach((item) => {
          if (item._id.toString() == category._id.toString()) {
            item.name = category.name;
          }
        });
      });

      const history = await Transaction.find({ player: req.player._id })
        .populate("category")
        .sort({ createdAt: "desc" });

      res
        .status(200)
        .json({ data: history, count_category_value: categoryValueCount });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
  profile: async (req, res, next) => {
    try {
      const player = {
        id: req.player._id,
        name: req.player.name,
        username: req.player.username,
        email: req.player.email,
        phoneNumber: req.player.phoneNumber,
        avatar: req.player.avatar ? req.player.avatar : "",
      };

      res.status(200).json({
        data: player,
      });
    } catch (error) {
      res.status(500).json({
        error: 1,
        message: error.message || "Internal server error",
      });
    }
  },
  editProfile: async (req, res, next) => {
    try {
      
    } catch (error) {
      
    }
  }
};
