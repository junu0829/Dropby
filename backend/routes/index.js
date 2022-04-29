const router = require("express").Router();

const drop = require("./dropRouter");
const auth = require("./authRouter");
const place = require("./placeRouter");
const area = require("./areaRouter");

router.use("/", place);
router.use("/auth", auth);
router.use("/:placePk/drops", drop);
router.use("/area", area);

module.exports = router;