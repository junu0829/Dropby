const router = require("express").Router();

const auth = require("./authRouter");
const area = require("./areaRouter");
// const image = require('./imageRouter');
router.use("/auth", auth);

// router.use("/image", image)
router.use("/", area);

module.exports = router;

 //   host/<int:areaPk>/<int:placePk>/<int:dropPk>/
 //   host/auth