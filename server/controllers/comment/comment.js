const ErrorWrapper = require("express-async-handler")
const Comment = require("../../model/comment")
const Story = require("../../model/story")
const User = require("../../model/user")
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
  const { user } = req.body
  const { comment_id } = req.params
  console.log(user, comment_id)
  if (!user && !comment_id) {

    throw new CustomError("user and comment_id not provided", 400)
  }

  User.findOne({ username: user })
    .exec(
      (err, activeUser) => {

        if (err) {
          next(new Error(err))

        }
        console.log(activeUser)
        if (!activeUser) {
          next(new Error("no user is found"))
        }
        console.log(activeUser)

        Comment.findOne({ _id: comment_id }).exec((err, comment) => {
          if (err) {
            return next(new Error(err))
          }

          if (!comment) {
            return next(new CustomError("no comment found with this id", 400))

          }
          console.log(comment)
          // if (!comment.likes) {
          //   return next(new CustomError("no likes property in comment", 400))
          // }
          if (!comment.likes?.includes(activeUser?._id)) {
            comment.likes?.push(activeUser?._id)
            comment.likeCount = comment.likes?.length

            comment.save()

          } else {
            const index = comment.likes.indexOf(activeUser?._id)
            comment.likes?.splice(index, 1)
            comment.likeCount = comment.likes.length

            comment.save()
          }

          const likeStatus = comment.likes?.includes(activeUser?._id)


          return res.status(200).json({
            success: true,
            data: comment,
            likeStatus
          })

        })



      }
    )


  // if (!activeUser) {
  //   throw new Error("no user is found")
  // }
  // console.log(activeUser)
  // const comment = await Comment.findOne(comment_id)
  //
  // if (!comment) {
  //   throw new Error("no comment found with this id")
  // }
  // console.log(comment)
  //
  // if (!comment.likes) {
  //   return new Error("no likes array in the comment")
  // }
  //

  //






})
const getCommentLikeStatus = ErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body
  const { comment_id } = req.params
  if (!activeUser || !comment_id) {
    next(new Error("activeUser and comment_id is not valid"))
  }

  const comment = await Comment.findOne({ _id: comment_id })
  if (!comment) {
    next(new Error("no comment found"))
  }
  const user = await User.findOne({ username: activeUser })
  if (!user) {
    next(new Error("no user found"))
  }

  const likeStatus = comment.likes.includes(user._id)

  return res.status(200).json({
    success: true,
    likeStatus, likes: comment.likeCount
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
