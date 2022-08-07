const express = require('express')
const router = express.Router()

//client will request by typing /user/profile or /user/editProfile
router.get('/profile')
router.post('/editProfile')
router.put('changePassword')
router.post(':slug/addStoryToReadList')
router.get('/readList')


module.exports = router;
