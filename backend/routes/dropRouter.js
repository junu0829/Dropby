const router = require('express').Router({mergeParams:true});
const passport = require('passport');
const controller = require('../controllers/dropController');
const jwtpassportAuth = passport.authenticate('jwtAccess', {session:false});

//jwtpassportAuth 임시로 삭제함. 다시 추가 필요
router.post('/', controller.newDrop);
router.get('/', controller.getDrops);
router.put('/:dropPk', controller.updateDrop);
router.delete('/:dropPk', controller.deleteDrop);

module.exports = router;