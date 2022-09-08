const ErrorWrapper = require("express-async-handler")
const Comment = require("../../model/comment")
const Story = require("../../model/story")

const addNewCommentToStory = ErrorWrapper( async( req, res, next) => {
  const {slug} = req.params
  const {star, content} = req.body

  const story = await Story.findOne({slug})

  const comment = await Comment.create({
    story : story._id,
    content,
    author:req.user.id,
    star
  })

  story.comments.push(comment._id)

  story.commentCount = story.comments.length

  await story.save()

  return res.status(200).json({
    success:true,
    data:comment,
  })
})


const getAllCommentByStory = ErrorWrapper( async( req, res, next) => {
  const {slug} =  req.params

  const story =  await Story.findOne({slug})
  
  const commentList = Comment.find({
    story:story._id,
  }).populate({
    path:"author",
    select:"username"
  }).sort("-createdAt")

  return res.status(200).json({
    success: true,
    count: story.commentCount,
    data: commentList
  })

})

const commentLike = ErrorWrapper( async( req, res, next) => {
  const {activeUser} =  req.body
  const {commment_id} = req.params

  const comment = await Comment.findOne(comment_id)

  if(!comment.likes.includes(activeUser._id)){
    comment.likes.push(activeUser._id)
    comment.likeCount = comment.likes.length

    await comment.save()
  }else{
    const index = comment.likes.indexOf(activeUser._id)
    comment.likes.splice(index, 1)
    comment.likeCount = comment.likes.length

    await comment.save()
  }

  const likeStatus = comment.likes.includes(activeUser._id)

  return res.status(200).json({
    success: true,
    data: comment,
    likeStatus
  })

})


const getCommentLikeStatus = ErrorWrapper( async( req, res, next) => {
  const {activeUser} = req.body
  const {comment_id} = req.params

  const comment = await Comment.findOne(comment_id)

  const likeStatus = comment.likes.includes(activeUser._id)

  return res.status(200).json({
    success: true,
    likeStatus
  })
})


module.exports = {
  addNewCommentToStory,
  getAllCommentByStory,
  commentLike,
  getCommentLikeStatus
}
