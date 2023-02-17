const express = require("express");
const { index, viewCreate, create, viewEdit, edit } = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", create);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", edit);

module.exports = router;
