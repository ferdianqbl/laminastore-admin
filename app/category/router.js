const express = require("express");
const { index, viewCreate, create } = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", create);

module.exports = router;
