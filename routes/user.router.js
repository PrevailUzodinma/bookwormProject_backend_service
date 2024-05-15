const router = require ("express").Router()
const verifyToken = require("../middlewares/verifyToken.middleware.js")
const {signup, login, forgotPassword, resetPassword, getResetForm, logout}= require ('../controllers/user.controller.js')


router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.get('/resetPassword/:id', getResetForm)
router.patch('/resetPassword/:id', resetPassword)
router.get('/logout', logout);


module.exports = router; 