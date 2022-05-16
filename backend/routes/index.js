const router = require("express").Router();

const auth = require("./authRouter");
const area = require("./areaRouter");
<<<<<<< HEAD
// const image = require('./imageRouter');
router.use("/auth", auth);

// router.use("/image", image)
=======

router.use("/auth", auth);
>>>>>>> 8073e1923d8a38ab8259843a0b7c2ceb4b818b6e
router.use("/", area);

module.exports = router;