const express = require("express")
const ErrorWrapper = require("express-async-handler")
const Story = require("../../model/story")
const { searchHelper, paginateHelper } = require("../../helpers/queryhelpers.js")
const chalk = require("chalk")
const { objectId, default: mongoose } = require("mongoose")
const { handleError } = require("../../helpers/libraries/handleError")
const User = require("../../model/user")
const Comment = require("../../model/comment")




const addStory = ErrorWrapper(async (req, res, next) => {

  const { title, content } = req.body

  let wordCount = content.trim().split(/\s+/).length

  // The trim() method removes whitespace from both sides of a string.
  // The split() method splits a string into an array of substrings.
  //
  // The split() method returns the new array.
  //
  // The split() method does not change the original string.

  let readTime = Math.floor(wordCount / 200)
  try {
    const newStory = await Story.create({
      title,
      content,
      author: req.user._id,
      author: req.user.username,
      readTime
    })
    return res.status(200).json({
      success: true,
      message: "Story added successfully",
      data: newStory
    })
  } catch (err) {
    return next(err)
  }


})

const getAllStories = ErrorWrapper(async (req, res, next) => {
  try {
    const page = parseInt(req.query?.page) || 1

    const limit = parseInt(req.query?.limit) || 10
    const skip = (page - 1) * limit
    const query = await Story.aggregate([{ $match: {} }]).sort({ createdAt: -1 }).skip(skip).limit(limit)   // query.sort("createdAt")
    // query.limit(3)
    return res.status(200).json({
      query
    })

  } catch (error) {
    return next(error)
  }
})

const commentStatusOfAStory = async (req, res, next) => {
  try {

    const { slug } = req.params
    if (!slug) next("no slug is provided")
    const story = await Story.findOne({ slug }).catch(handleError)
    console.log(story)

    const comment = await Comment.find({
      _id: {
        $in: story?.comments?.map(id => mongoose.Types.ObjectId(id))
      }
    }).catch(handleError)

    console.log(comment)

  } catch (error) {
    console.error(error)
    next(error)
  }
}

const detailStory = async (req, res, next) => {
  try {
    const { slug } = req.params;

    if (!slug) next("no slug  is provided")
    const story = await Story.findOne({
      slug
    }).catch(handleError)

    // const user = await User.findOne({ username: activeUser }).catch(handleError)


    console.log(story)
    return res.status(200).json({
      story
    })
  } catch (error) {
    console.error(error)
    next(error)
  }

}

const storyLikeStatus = async (req, res, next) => {
  try {
    let likeStatus = false
    const { slug } = req.params
    if (!slug) next("no slug is found")
    const user = req.user

    const story = await Story.findOne({ slug, likes: { $in: mongoose.Types.ObjectId(user._id) } }).catch(handleError)

    console.log(story)
    if (story) {
      likeStatus = true
    }

    console.log(likeStatus)

    res.status(200).json({
      likeStatus
    })

  } catch (error) {
    console.log(error)
    next(error)
  }
}

const likeStory = async (req, res, next) => {
  const user = req.user;
  const { slug } = req.params;

  const foundStory = await Story.findOne({ slug: slug }).catch(handleError)
  console.log(foundStory)
  const story = await Story.findOneAndUpdate({
    slug
  }, [
    {
      $set: {
        "likes": {
          $cond: [
            {
              $in: [user._id, "$likes"]
            },
            {
              $setDifference: ["$likes", [user._id]]
            },
            {
              $concatArrays: ["$likes", [user._id]]
            }
          ]
        }
      },

    },
    {
      $set: {
        "isLiked": {
          $cond: [
            { $in: [user._id, "$likes"] }, true, false
          ]
        }
      }
    }
  ]).catch(handleError)


  console.log(story)


  // console.log(user, slug)
  // console.log(chalk.red(story))
  // const storyLikesUserIds = story.likes.map(json => {
  //
  //   return json._id.toString()
  // })
  // let isLiked = false
  // console.log(storyLikesUserIds.includes(user._id.toString()))
  //
  // // console.log(chalk.blueBright(storyLikesUserIds))
  //
  // const id = user._id.toString()
  //
  // if (!storyLikesUserIds.includes(id)) {
  //   story.likes.push(user)
  //   story.likeCount = story?.likes?.length
  //   isLiked = true
  //   // console.log(chalk.green(story.likeCount))
  //   // console.log(id)
  //   // console.log(story.likes)
  //
  //
  //   await story.save()
  // } else {
  //   const index = story.likes.indexOf(id);
  //
  //   story.likes.splice(index, 1)
  //   // console.log(story.likes)
  //
  //   // console.log(id)
  //   // console.log("spliced")
  //   story.likeCount = story.likes.length
  //
  //   // console.log(chalk.red(story.likeCount))
  //
  //   await story.save()
  // }
  //
  // console.log(chalk.whiteBright(story))
  return res.status(200).json({
    success: true,
    data: { story }
  })


}


const editStoryPage = async (req, res, next) => {
  try {
    const { slug } = req.params
    const { title, content } = req.body

    if (!title || !content) {
      next("no title or content")
    }

    const story = await Story.findOneAndUpdate({
      slug
    }, { title: title, content: content }, { new: true }).catch(handleError)

    console.log("story is " + story)

    return res.status(200).json({
      success: true,
      data: story
    })



  } catch (error) {
    console.error(error)
    next(error)
  }
}

const searchInStory = async (req, res, next) => {
  try {
    const { searchString } = req.body
    if (!searchString) {
      return next("you should give a searchString")
    }

    const searchResult = await Story.find({
      $text: {
        $search: searchString
      }
    })
    console.log(searchResult)

    res.status(200).json({
      searchResult
    })


  } catch (error) {
    console.error(error)
    next(error)
  }
}

const editStory = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params
  const { title, content } = req.body

  const story = await Story.findOne({
    slug
  })

  story.title = title
  story.content = content

  await story.save()

  return res.status(200).json({
    success: true,
    data: story
  })

})


const deleteStory = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params
  console.log(slug)

  const story = await Story.findOne({ slug })

  console.log(story)

  await story.remove()

  return res.status(200).json({
    success: true,
    message: "Story is deleted successfully"
  })
})


module.exports = {
  addStory,
  getAllStories,
  detailStory,
  likeStory,
  editStoryPage,
  editStory,
  searchInStory,
  storyLikeStatus,
  deleteStory
}
