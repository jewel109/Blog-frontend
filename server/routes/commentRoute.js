const express = require("express")
const { getAccessToRoute } = require("../middlewares/auth/accessRoute")
const { commentLike, addNewCommentToStory, getAllCommentByStory, getCommentLikeStatus } = require("../controllers/comment/comment")
const { checkStoryExist } = require("../middlewares/database/databaseErrorHandler")

const router = express.Router()

router.post("/:slug/addcomment", [getAccessToRoute, checkStoryExist], addNewCommentToStory)

router.get("/:slug/getallcomment", getAllCommentByStory)

router.post("/:commment_id/like", commentLike)

router.post("/:comment_id/get_comment_like_status", getCommentLikeStatus)




module.exports = router
