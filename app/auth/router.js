const uploadPlayer = require("../../middleware/multerPlayer");
const { signup, login } = require("./controller");
const router = require("express").Router();

router.post("/sign-up", uploadPlayer.single("image"), signup);
router.post("/login", login);

module.exports = router;
