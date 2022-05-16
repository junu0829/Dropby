const router = require('express').Router({mergeParams:true});
const passport = require('passport');
const controller = require('../controllers/areaController');
const place = require('./placeRouter');

const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

router.post('/', controller.newArea);
router.get('/', controller.getAreas);
router.use('/:areaPk', place);

module.exports = router;