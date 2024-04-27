const express = require('express')
const { profile, editProfile, changePassword, addStoryToReadList, totalLikedStory, showReadList, followerOfUser, sendMessageToUser, makeNotification } = require('../controllers/user/user')
const { getAccessToRoute } = require('../middlewares/auth/accessRoute')

const router = express.Router()

//client will request by typing /user/profile or /user/editProfile
router.get('/profile', getAccessToRoute, profile)
router.post('/editProfile', getAccessToRoute, editProfile)
router.put('changePassword', getAccessToRoute, changePassword)
router.post('/addStoryToReadList', getAccessToRoute, addStoryToReadList)
router.get('/showReadList', getAccessToRoute, showReadList)
router.get("/totalLikedStory", totalLikedStory)

router.post("/follow", followerOfUser)
router.post("/message", sendMessageToUser)
router.post("/addNotification", getAccessToRoute, makeNotification)

module.exports = router;
