const express = require('express')
const { profile, editProfile, changePassword, addStoryToReadList, readListPage, totalLikedStory } = require('../controllers/user/user')
const { getAccessToRoute } = require('../middlewares/auth/accessRoute')

const router = express.Router()

//client will request by typing /user/profile or /user/editProfile
router.get('/profile', getAccessToRoute, profile)
router.post('/editProfile', getAccessToRoute, editProfile)
router.put('changePassword', getAccessToRoute, changePassword)
router.post(':slug/addStoryToReadList', getAccessToRoute, addStoryToReadList)
router.get('/readList', getAccessToRoute, readListPage)
router.get("/totalLikedStory", totalLikedStory)


module.exports = router;
