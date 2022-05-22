const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const controller = require("../controllers/dropController");
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });
const upload = require('../utils/multer');

router.post("/", jwtpassportAuth, upload.array('image', 5), controller.newDrop);
router.get("/", controller.getDrops);
router.put("/:dropPk", jwtpassportAuth, controller.updateDrop);
router.delete("/:dropPk", jwtpassportAuth, controller.deleteDrop);

module.exports = router;
