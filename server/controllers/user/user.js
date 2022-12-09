const ErrorWrapper = require('express-async-handler')
const {
  validateInput,
  comparePassword,
} = require('../../helpers/inputHelper.js')
const CustomError = require('../../middlewares/Error/CustomError')
const Story = require('../../model/story')
const User = require('../../model/user')

const profile = ErrorWrapper(async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  })
})

const editProfile = ErrorWrapper(async (req, res) => {
  const { username, email } = req.body
  if (!user) {
    return res.status(202).json({
      success: false,
      message: 'No user found',
    })
  }
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      username,
      email,
    },
    {
      new: true,
      runValidators: true,
    }
  )

  return res.status(200).json({
    success: true,
    data: user,
    message: 'user found',
  })
})

const changePassword = ErrorWrapper(async (req, res, next) => {
  const { newPassword, oldPassword } = req.body

  if (!validateInput(newPassword, oldPassword)) {
    return res.status(200).json({
      success: false,
      message: 'Input is wrong',
    })
  }

  const user = User.findById(req.user.id).select('+password')
  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'User is not found',
    })
  } else if (!comparePassword(oldPassword, user.password)) {
    return res.status(200).json({
      success: false,
      message: 'oldpassword is not matched with newPassword',
    })
  }

  user.password = newPassword

  await user.save()

  return res.status(200).json({
    success: true,
    message: 'Password changed successfully',
    data: user,
  })
})

const addStoryToReadList = ErrorWrapper(async (req, res, next) => {
  const { slug } = req.params
  const { activeUser } = req.body

  const story = await Story.findOne(slug)
  const user = await User.findById(activeUser._id)
  if (!story || !user) {
    return res.status(200).json({
      success: false,
      message: 'User/story is not found',
    })
  }
  if (!user.readList.includes(story.id)) {
    user.readList.push(story.id)
    user.readListLength = user.readList.length
    await user.save()
  } else {
    const index = user.readList.indexOf(story.id)
    user.readList.splice(index, 1)
    user.readList.readListLength = user.readList.length
    await user.save()
  }

  const status = user.readList.includes(story.id)

  return res.status(200).json({
    success: true,
    story: story,
    user: user,
    status: status,
  })
})

const readListPage = ErrorWrapper(async (req, res, next) => {
  const user = await User.findById(req.user.id)
  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'User is not found',
    })
  }
  const readList = []

  for (let index = 0; index < user.readList.length; index++) {
    let story = await Story.findById(user.readList[index]).populate('author')

    readList.push(story)
  }

  return res.status(200).json({
    success: true,
    data: readList,
    message:"Your readlist"
  })
})

module.exports = {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
}
