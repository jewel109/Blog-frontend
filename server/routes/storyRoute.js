const express = require("express")

const router = express.Router()

const {getAccessToRoute} = require("../middlewares/auth/accessRoute")


const {addStory,editStory,deleteStory,editStoryPage,likeStory,detailStory,getAllStories} = require("../controllers/story/story")

const {checkStoryExist, checkUserAndStoryExist} = require("../middlewares/database/databaseErrorHandler")


router.post("/addstory",[getAccessToRoute,addStory] )

router.post("/:slug", checkStoryExist,detailStory)

router.post("/:slug/like",[getAccessToRoute,checkStoryExist],likeStory)



module.exports = router
