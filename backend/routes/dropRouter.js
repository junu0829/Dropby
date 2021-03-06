const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const controller = require("../controllers/dropController");
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });
const upload = require('../utils/multer');

router.post("/", jwtpassportAuth, upload.array('image', 5), controller.newDrop);
router.get('/', jwtpassportAuth, controller.getDrops);
router.get("/public", jwtpassportAuth, controller.getPublicDrops);
router.get('/my', jwtpassportAuth, controller.getMyDrops);
router.put("/:dropPk", jwtpassportAuth, upload.array('image', 5), controller.updateDrop);
router.delete("/:dropPk", jwtpassportAuth, controller.deleteDrop);
router.get('/:dropPk', jwtpassportAuth, controller.getDrop);

module.exports = router;
