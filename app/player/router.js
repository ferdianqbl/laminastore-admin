const router = require("express").Router();
const { landingPage, detailPage, category, checkout } = require("./controller");

router.get("/landing-page", landingPage);
router.get("/:id/detail/", detailPage);
router.get("/category", category);
router.post("/checkout", checkout);

module.exports = router;
