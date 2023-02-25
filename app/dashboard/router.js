const express = require("express");
const { index } = require("./controller");
const router = express.Router();
const { isLogin } = require("../../middleware/auth");

router.use(isLogin);
router.get("/", index);

module.exports = router;
