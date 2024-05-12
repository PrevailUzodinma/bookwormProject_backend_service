const router = require ("express").Router()
const {signup, login, forgotPassword, resetPassword}= require ('../controllers/user.controller.js')


router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.patch('/resetPassword', resetPassword)

module.exports = router; 