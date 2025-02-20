const router = require ("express").Router();
const verifyToken = require("../middlewares/verifyToken.middleware.js");
const {signup, login, forgotPassword, resetPassword, logout}= require ('../controllers/user.controller.js')


router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword', resetPassword)
router.get('/logout', logout);


module.exports = router; 