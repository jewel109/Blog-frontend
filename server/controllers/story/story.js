const express = require("express")
const ErrorWrapper = require("express-async-handler")
const Story = require("../../model/story")
const { searchHelper, paginateHelper } = require("../../helpers/queryhelpers.js")
const chalk = require("chalk")
const { objectId, default: mongoose } = require("mongoose")




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

const detailStory = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params;
  const { activeUser } = req.body;
  const story = await Story.findOne({
    slug
  })

  const storyLikesUserIds = story.likes.map(json => json.id)
  const likeStatus = storyLikesUserIds.includes(activeUser._id)

  return res.status(200).json({
    success: true,
    data: story,
    likeStatus,
  })
})

const likeStory = ErrorWrapper(async (req, res, next) => {
  const user = req.user;
  const { slug } = req.params;

  const story = await Story.findOne({
    slug
  })
  // console.log(user, slug)
  // console.log(chalk.red(story))
  const storyLikesUserIds = story.likes.map(json => {

    return json._id.toString()
  })
  let isLiked = false
  console.log(storyLikesUserIds.includes(user._id.toString()))

  // console.log(chalk.blueBright(storyLikesUserIds))

  const id = user._id.toString()

  if (!storyLikesUserIds.includes(id)) {
    story.likes.push(user)
    story.likeCount = story?.likes?.length
    isLiked = true
    // console.log(chalk.green(story.likeCount))
    // console.log(id)
    // console.log(story.likes)


    await story.save()
  } else {
    const index = story.likes.indexOf(id);

    story.likes.splice(index, 1)
    // console.log(story.likes)

    // console.log(id)
    // console.log("spliced")
    story.likeCount = story.likes.length

    // console.log(chalk.red(story.likeCount))

    await story.save()
  }

  // console.log(chalk.whiteBright(story))
  return res.status(200).json({
    success: true,
    data: { story, isLiked }
  })


})


const editStoryPage = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params

  const story = await Story.find({
    slug
  }).populate("author likes")


  return res.status(200).json({
    success: true,
    data: story
  })


})

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
  deleteStory
}
