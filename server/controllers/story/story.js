const express = require("express")
const ErrorWrapper = require("express-async-handler")




const router = express.Router()


const addStory = ErrorWrapper( async (req, res, next) => {

  const {title, content} = req.body

  let wordCount = content.trim().split(/\s+/).length

  // The trim() method removes whitespace from both sides of a string.
  // The split() method splits a string into an array of substrings.
  //
  // The split() method returns the new array.
  //
  // The split() method does not change the original string.

  let readTime = Math.floor(wordCount/200)
  try{
    const newStory = await Story.create({
      title,
      content,
      author:req.user._id,
      readTime
    })
    return res.status(200).json({
      success:true,
      message:"Story added successfully",
      data:newStory
    })
  }catch(err){
    return next(err)
  }
  

})

const getAllStories = ErrorWrapper( async (req, res, next) => {
  
})



module.exports = router
