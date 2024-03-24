const ErrorWrapper = require("express-async-handler")
const Comment = require("../../model/comment")
const Story = require("../../model/story")
const chalk = require("chalk")
const CustomError = require("../../middlewares/Error/CustomError")

const log = console.log

const addNewCommentToStory = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params
  const { content } = req.body
  console.log(req)
  console.log(req.body)
  console.log("content " + content, "slug " + slug)

  if (!slug || !content) {
    return next(new CustomError("client didn't provide valid data")
    )
  }
  try {
    const story = await Story.findOne({ slug })
    if (!story) {
      return next(new CustomError("no story found"))
    }
    log(chalk.yellow(story))
    const comment = await Comment.create({
      story: story._id,
      content,
      author: req.user._id,
      author: req.user.username,
    })


    story.comments.push(comment._id)

    story.commentCount = story.comments.length

    await story.save()

    return res.status(200).json({
      success: true,
      data: comment,
    })
  }

  catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      error: `${error}`
    })
  }

})


const getAllCommentByStory = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params

  const story = await Story.findOne({ slug })
  console.log(story._id)

  const commentList = Comment.aggregate([
    {
      $match: {
        story: story._id
      },
    },
    {
      $addFields: {
        date: {
          $dateToString: {
            date: "$createdAt"
            ,
            format: "%d %b %Y"
          }
        }
      }
    },
    {
      $sort: {
        "createdAt": -1

      }
    }
  ], function(err, resp) {
    if (err) {
      return res.status(500).json({
        message: `${err}`
      })
    }
    return res.status(200).json({
      success: true,
      count: story.commentCount,
      data: resp,
    })
  })

})

const commentLike = ErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body
  const { commment_id } = req.params

  const comment = await Comment.findOne(comment_id)

  if (!comment.likes.includes(activeUser._id)) {
    comment.likes.push(activeUser._id)
    comment.likeCount = comment.likes.length

    await comment.save()
  } else {
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


const getCommentLikeStatus = ErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body
  const { comment_id } = req.params

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
  getCommentLikeStatus,
  chalk,
  log

}
