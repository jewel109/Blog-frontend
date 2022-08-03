const express = require("express")
const router = express.Router()
const {register, login, forgetPassword,resetPassword} = require('../controllers/auth/auth')

router.post('/register',register)
router.post('/login',login)
router.post('/forgetpassword',forgetPassword)
router.post('/resetpassword', resetPassword)

module.exports = router
