const router = require("express").Router();
const { isLoginPlayer } = require("../../middleware/auth");
const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
} = require("./controller");

router.get("/landing-page", landingPage);
router.get("/:id/detail/", detailPage);
router.get("/category", category);
router.get("/history", isLoginPlayer, history);
router.post("/checkout", isLoginPlayer, checkout);

module.exports = router;
