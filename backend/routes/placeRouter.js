const router = require('express').Router({mergeParams:true});
const passport = require('passport');
const controller = require('../controllers/placeController');

const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

router.post('/', jwtpassportAuth, controller.newPlace);
router.get('/', controller.getPlaces);
router.get('/:placePk', jwtpassportAuth, controller.getPlace);

module.exports = router;