const express = require("express")

const router = express.Router()

const {getAccessToRoute} = require("../middlewares/auth/accessRoute")


const {addStory,editStory,deleteStory,editStoryPage,likeStory,detailStory,getAllStories} = require("../controllers/story/story")

const {checkStoryExist, checkUserAndStoryExist} = require("../middlewares/database/databaseErrorHandler")


router.post("/addstory",[getAccessToRoute,addStory] )

router.post("/:slug", checkStoryExist,detailStory)

router.post("/:slug/like",[getAccessToRoute,checkStoryExist],likeStory)

router.get("/editstory/:slug",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist],editStoryPage)

router.put("/:slug/edit",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist],editStory)

router.delete("/:slug/delete",[getAccessToRoute,checkStoryExist,checkUserAndStoryExist],deleteStory)

router.get("/getallstories",getAllStories)

module.exports = router
