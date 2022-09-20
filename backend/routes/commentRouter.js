const router = require("express").Router({ mergeParams: true });
const passport = require("passport");
const controller = require("../controllers/commentController");
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });

router.post("/", jwtpassportAuth, controller.newComment);
router.get("/", jwtpassportAuth, controller.getComments);
router.put("/:commentPk", jwtpassportAuth, controller.updateComment);
router.delete("/:commentPk", jwtpassportAuth, controller.deleteComment);

router.post("/:commentPk/like", jwtpassportAuth, controller.toggleCommentLike);

module.exports = router;
