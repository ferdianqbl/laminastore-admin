const uploadPlayer = require("../../middleware/multerPlayer");
const { signup } = require("./controller");
const router = require("express").Router();

router.post("/sign-up", uploadPlayer.single("image"), signup);

module.exports = router;
