const router = require("express").Router();

const auth = require("./authRouter");
const area = require("./areaRouter");
const image = require('./imageRouter');
router.use("/auth", auth);
router.use("/:areaPk", area);
router.use("/image", image)

module.exports = router;