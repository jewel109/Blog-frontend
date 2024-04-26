const express = require('express')
const { profile, editProfile, changePassword, addStoryToReadList, totalLikedStory, showReadList } = require('../controllers/user/user')
const { getAccessToRoute } = require('../middlewares/auth/accessRoute')

const router = express.Router()

//client will request by typing /user/profile or /user/editProfile
router.get('/profile', getAccessToRoute, profile)
router.post('/editProfile', getAccessToRoute, editProfile)
router.put('changePassword', getAccessToRoute, changePassword)
router.post('/addStoryToReadList', getAccessToRoute, addStoryToReadList)
router.get('/showReadList', getAccessToRoute, showReadList)
router.get("/totalLikedStory", totalLikedStory)


module.exports = router;
