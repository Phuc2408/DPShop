const authController = require('../../controller/authControllers');
const passport = require('passport');

const router = require('express').Router();

router.post('/register', authController.registerUser)
router.post('/login', passport.authenticate('local', { session: false }), authController.loginCallback);

module.exports = router;


