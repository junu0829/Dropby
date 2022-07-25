const router = require('express').Router({mergeParams:true});
const passport = require("passport");
const place = require('./placeRouter');
const controller = require('../controllers/areaController');
const jwtpassportAuth = passport.authenticate("jwtAccess", { session: false });

router.post('/', controller.newArea);
router.get('/', controller.getAreas);
router.get('/:areaPk/drops', jwtpassportAuth, controller.getAreaDrops);

router.use('/:areaPk/places', place);

module.exports = router;