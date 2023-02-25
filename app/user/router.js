const express = require("express");
const { viewLogin } = require("./controller");
const router = express.Router();

router.get("/", viewLogin);

module.exports = router;
