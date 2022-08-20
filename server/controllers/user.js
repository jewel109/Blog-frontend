const ErrorWrapper = require('express-async-handler')
const { validateInput, comparePassword } = require('../helpers/inputHelper')
const CustomError = require('../middlewares/Error/CustomError')
const Story = require('../model/story')
const User = require('../model/user')

const profile = ErrorWrapper(async(req,res) => {

  return res.status(200).json({
    success:true,
    data: req.user
  })
})


const editProfile = ErrorWrapper( async (req,res) => {

  const {username, email} = req.body

  const user = await User.findByIdAndUpdate(req.user.id, {
    username, email
  },{
      new :true,
      runValidators:true
    })

  return res.status(200).json({
    success:true,
    data:user
  })

})

const changePassword = ErrorWrapper( async( req, res,next ) =>{


  const {newPassword, oldPassword}  = req.body

  if(!validateInput(newPassword, oldPassword)){
    return next(new CustomError(" Input is wrong"), 400)
  }

  const user = User.findById(req.user.id).select("+password")
  
  if(!comparePassword(oldPassword,user.password)){
    return next(new CustomError(" Password is not matched"),400)
  }

  user.password = newPassword

  await user.save()


  return res.status(200).json({
    success:true,
    message:"Password changed successfully",
    data:user
  })
})

const addStoryToReadList = ErrorWrapper( async (req, res, next) => {

  const {slug} = req.params
  const {activeUser} = req.body

  const story =await Story.findOne(slug)
  const user =await User.findById(activeUser._id)
  
  if(!user.readList.includes(story.id)){
    user.readList.push(story.id)
    user.readListLength = user.readList.length
    await user.save()
  }else{
    const index = user.readList.indexOf(story.id)
    user.readList.splice(index,1)
    user.readList.readListLength = user.readList.length
    await user.save()
  }

  const status = user.readList.includes(story.id)

  return res.status(200).json({
    success:true,
    story:story,
    user: user,
    status:status
  })

})


