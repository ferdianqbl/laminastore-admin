var express = require("express");
const { index } = require("./controller");
var router = express.Router();

/* GET home page. */
router.get("/", index);

module.exports = router;
