const ErrorWrapper = require('express-async-handler')
const {
  validateInput,
  comparePassword,
} = require('../../helpers/inputHelper.js')
const CustomError = require('../../middlewares/Error/CustomError')
const Story = require('../../model/story')
const User = require('../../model/user')
const { default: mongoose } = require('mongoose')

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
const totalLikedStory = async (req, res, next) => {
  try {
    const { username } = req.body
    if (!username) {
      throw new Error("username is not provided")
    }
    const user = await User.findOne({ username: username })
    if (!user) {
      throw new Error("no user found with this username")
    }

    console.log(user)

    //TODO i have to find story which have not null likes properties
    const allStory = await Story.find({
      likes: { $in: [mongoose.Types.ObjectId(user._id)] }
    })
    //TODO how to do this with aggregation

    if (!allStory) {
      throw new Error("allStory is not found")
    }

    console.log(allStory)
    console.log(allStory.length)

    // const aggregationData = await Story.aggregate([
    //   {
    //     $match: {
    //       _id: {
    //         $in:          }
    //     }
    //   }
    // ],)
    //
    // if (!aggregationData) {
    //   throw new Erro("aggregationData is not found")
    // }
    // console.log(aggregationData)
    //

    res.status(200).json({
      data: allStory,
      totalLiked: allStory.length
    })

  } catch (error) {
    console.error(error)
    next(error)

  }
}
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

const addStoryToReadList = async (req, res, next) => {
  try {
    const { slug } = req.body
    const { username } = req.body

    if (!slug) {
      throw new Error("slug is not provided")
    }
    if (!username) {
      throw new Error("username is not provided")
    }
    const story = await Story.findOne({ slug: slug })
    if (!story) {
      throw new Error("story is not found")
    }
    // console.log(story)

    const user = await User.findOne({ username: username })
    if (!user) {
      throw new Error("user is not found")
    }
    console.log(user)
    const findUserHavingIdInReadList = await User.findOne({ _id: mongoose.Types.ObjectId(user._id), readList: { $in: [mongoose.Types.ObjectId(story._id)] } })

    console.log(`if found the user having the story id  ${findUserHavingIdInReadList} `)
    if (findUserHavingIdInReadList) {
      console.log("in here")
      console.log(findUserHavingIdInReadList)
    }
    if (!findUserHavingIdInReadList) {
      const updatedUser = await User.findOneAndUpdate({ username: username }, { $addToSet: { readList: story._id } }, { new: true })
      if (!updatedUser) {
        throw new Error("updatedUser is not found")
      }
      console.log(updatedUser)

      console.log("if not found the user in the readlist" + updatedUser)

    }

    if (findUserHavingIdInReadList?.readList) {

      const updatedUser = await User.findOneAndUpdate({ username: username }, { $pull: { "readList": mongoose.Types.ObjectId(story._id) } }, { new: true })
      console.log("user updated " + updatedUser)
    }



  } catch (error) {
    console.error(error)
    next(error)

  }


}

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
    message: "Your readlist"
  })
})

module.exports = {
  profile,
  editProfile,
  changePassword,
  addStoryToReadList,
  readListPage,
  totalLikedStory,
}
