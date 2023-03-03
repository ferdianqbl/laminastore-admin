const router = require("express").Router();
const { isLoginPlayer } = require("../../middleware/auth");
const { landingPage, detailPage, category, checkout } = require("./controller");

router.get("/landing-page", landingPage);
router.get("/:id/detail/", detailPage);
router.get("/category", category);
router.post("/checkout", isLoginPlayer, checkout);

module.exports = router;
