const router = require("express").Router();

const auth = require("./authRouter");
const area = require("./areaRouter");
const image = require('./imageRouter');

router.use("/image", image)
// const image = require('./imageRouter');
router.use("/auth", auth);

// router.use("/image", image)
router.use("/", area);

module.exports = router;
