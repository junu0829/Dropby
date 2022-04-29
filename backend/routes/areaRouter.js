const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/areaController');

const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

router.post('/area', controller.newArea);
router.get('/:placePk', jwtpassportAuth, controller.getPlaces);

module.exports = router;