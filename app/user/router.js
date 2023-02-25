const express = require("express");
const router = express.Router();
const { viewLogin, login } = require("./controller");

router.get("/", viewLogin);
router.post("/", login);

module.exports = router;
