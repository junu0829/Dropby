const router = require("express").Router();

const auth = require("./authRouter");
const area = require("./areaRouter");
const { newEmoji } = require("../controllers/emojiController");

router.use("/auth", auth);
router.use("/areas", area);
router.use("/emoji/add", newEmoji)
module.exports = router;
