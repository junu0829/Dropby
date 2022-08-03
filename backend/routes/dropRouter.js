const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const controller = require("../controllers/dropController");
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });
const comment = require('../routes/commentRouter');
const upload = require('../utils/multer');

router.post("/", jwtpassportAuth, upload.array('image', 5), controller.newDrop);
router.get('/', jwtpassportAuth, controller.getDrops);
router.get("/public", jwtpassportAuth, controller.getPublicDrops);
router.get('/my', jwtpassportAuth, controller.getMyDrops);
router.put("/:dropPk", jwtpassportAuth, upload.array('image', 5), controller.updateDrop);
router.delete("/:dropPk", jwtpassportAuth, controller.deleteDrop);
router.get('/:dropPk', jwtpassportAuth, controller.getDrop);
router.post('/:dropPk', jwtpassportAuth, controller.likeDrop);

router.use('/:dropPk/comments', jwtpassportAuth, comment);

module.exports = router;
