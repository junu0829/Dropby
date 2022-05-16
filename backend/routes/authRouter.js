const router = require('express').Router();
const passport = require('passport');
const controller = require('../controllers/authController');

const LocalPassportAuth = passport.authenticate('local', {session:false}); //id, pw 검증

router.post('/signup', controller.signUp, LocalPassportAuth, controller.logIn); //회원가입
router.post('/login', LocalPassportAuth, controller.logIn); //로그인_accessToken, refreshToken 발급
router.post('/token/refresh', controller.tokenRefresh) //AccessToken이 만료되면, refreshToken보내서 AccessToken 재발급
router.post('/logout', controller.logOut) //로그아웃
module.exports = router;

// 추후 할 것?
// refreshToken을 redis라는 서비스에 저장하는 경우도 있는 듯. 왜 쓰는지 알아보고 괜찮으면 추후 적용.