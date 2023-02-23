const express = require("express");
const uploadVoucher = require("../../middleware/multerVoucher");
const {
  index,
  viewCreate,
  create,
  remove,
  viewEdit,
  edit,
  status,
} = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", uploadVoucher.single("thumbnail"), create);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", uploadVoucher.single("thumbnail"), edit);
router.delete("/delete/:id", remove);
router.put("/status/:id", status);

module.exports = router;
