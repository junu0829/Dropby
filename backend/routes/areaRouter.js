const router = require('express').Router({mergeParams:true});
const passport = require('passport');
const controller = require('../controllers/areaController');
const place = require('./placeRouter');
const drop = require('../controllers/dropController');
const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

// router.use("/:placePk/drops", drop);
router.post('/', controller.newArea);
router.get('/', controller.getAreas);
router.use('/:areaPk', place);

module.exports = router;