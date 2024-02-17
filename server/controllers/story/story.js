const express = require("express")
const ErrorWrapper = require("express-async-handler")
const Story = require("../../model/story")
const { searchHelper, paginateHelper } = require("../../helpers/queryhelpers.js")




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
    const query = await Story.aggregate([{ $match: {} }]).sort({ createdAt: -1 }).limit(2)   // query.sort("createdAt")
    // query.limit(3)
    console.log(query)
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
  }).populate(" author likes")

  const storyLikesUserIds = story.likes.map(json => json.id)
  const likeStatus = storyLikesUserIds.includes(activeUser._id)

  return res.status(200).json({
    success: true,
    data: story,
    likeStatus,
  })
})

const likeStory = ErrorWrapper(async (req, res, next) => {
  const { activeUser } = req.body;
  const { slug } = req.params;

  const story = await Story.find({
    const story = await Story.findOne({
      slug
    }).populate("author likes")

  console.log(chalk.red(story))
  const storyLikesUserIds = story.likes.map(json => json._id.toString())
  console.log(storyLikesUserIds)

  if(!storyLikesUserIds.includes(activeUser._id)) {
      story.likes.push(activeUser)
  story.likeCount = story.likes.length

  await story.save()
} else {
  const index = storyLikesUserIds.indexOf(activeUser._id)
    story.likes.splice(index, 1)
    story.likeCount = story.likes.length

    await story.save()
}

  console.log(chalk.whiteBright(story))
  return res.status(200).json({
  success: true,
  data: story
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

  const story = await Story.findOne({ slug })

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
