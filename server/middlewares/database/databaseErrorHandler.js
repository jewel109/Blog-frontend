const ErrorWrapper = require("express-async-handler")
const Story = require("../../model/story")
const CustomError = require("../Error/CustomError")

const checkStoryExist = ErrorWrapper( async( req, res, next ) => {
  const {slug} = req.params

  const story = await Story.findOne({slug})

  if(!story) {
    return next(new CustomError("There is no such story with this slug", 400))
  }

  next()
})

const checkUserAndStoryExist = ErrorWrapper( async( req, res, next) => {
  const {slug} = req.params

  const story = await Story.findOne({
    slug,
    author: req.user
  })

  if(!story) {
    return next(new CustomError("There is no story with this slug ascociated with this user"))
  }

  next()

})

module.exports = {
  checkStoryExist,
  checkUserAndStoryExist
}
