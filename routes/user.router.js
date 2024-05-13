const router = require ("express").Router()
const {signup, login, forgotPassword, resetPassword, getResetForm}= require ('../controllers/user.controller.js')


router.post('/signup', signup)
router.post('/login', login)
router.post('/forgotPassword', forgotPassword)
router.get('/resetPassword/:id', getResetForm)
router.patch('/resetPassword/:id', resetPassword)

module.exports = router; 