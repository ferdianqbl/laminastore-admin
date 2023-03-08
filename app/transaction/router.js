const express = require("express");
const { index, status } = require("./controller");
const router = express.Router();
const { isLogin } = require("../../middleware/auth");

// router.use(isLogin);
router.get("/", index);
router.put("/status/:id", status);

module.exports = router;
