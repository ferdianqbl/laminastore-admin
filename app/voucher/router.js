const express = require("express");
const uploadVoucher = require("../../middleware/multerVoucher");
const {
  index,
  viewCreate,
  create,
  // remove,
  // viewEdit,
  // edit,
} = require("./controller");
const router = express.Router();

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", uploadVoucher.single("thumbnail"), create);
// router.get("/edit/:id", viewEdit);
// router.put("/edit/:id", edit);
// router.delete("/delete/:id", remove);

module.exports = router;
