const express = require("express");
const router = express.Router();
const { viewLogin, login, logout } = require("./controller");

router.get("/", viewLogin);
router.post("/", login);
router.get("/logout", logout);

module.exports = router;
