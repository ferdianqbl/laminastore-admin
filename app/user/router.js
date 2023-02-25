const express = require("express");
const { viewLogin, login } = require("./controller");
const router = express.Router();

router.get("/", viewLogin);
router.post("/", login);

module.exports = router;
