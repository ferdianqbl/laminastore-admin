const router = require("express").Router();
const { landingPage } = require("./controller");

router.get("/landing-page", landingPage);

module.exports = router;
