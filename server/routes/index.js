
const express = require("express")
const router = express.Router()



const authRoute = require('./auth')
const userRoute = require('./userRoute')
const storyRoute = require('./storyRoute')

router.use("/auth",authRoute)
router.use('/user',userRoute)
router.use('/story', storyRoute)

module.exports = router
