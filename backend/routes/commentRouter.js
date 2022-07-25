const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const controller = require("../controllers/commentController");
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });

router.post("/", jwtpassportAuth, controller.newComment);
router.get('/comments', jwtpassportAuth, controller.getComments);
router.put("/:commentPk", jwtpassportAuth, controller.updateComment);
router.delete("/:commentPk", jwtpassportAuth, controller.deleteComment);

module.exports = router;