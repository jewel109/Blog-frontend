"use client"
import { MainHeader } from "@/app/page"
import classNames from 'classnames'
import { useAppDispatch, type RootState } from "@/app/store/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { countOfComment, countOfLike, isLiked } from "@/app/features/storySlice"
import CommentInPost from "./commentInPost"
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
export default function Page() {
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const userData = useSelector((state: RootState) => state.userReducer)
  const commentData = useSelector((state: RootState) => state.commentReducer)
  const dispatch = useAppDispatch()
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [showDelete, setShowDelete] = useState(false)
  const [commentCount, setCommentCount] = useState(0)
  console.log(storyData)

  async function commentClickHandler() {
    const commentBox = document.getElementById("comment-box")
    commentBox?.scrollIntoView({ behavior: "smooth" })
  }

  async function likeClickHandler() {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        toast({
          title: "you are not logged in",
          action: <ToastAction altText="Log In" onClick={() => { router.push("/profile/login") }}>Log in</ToastAction>
        })
        return
      }
      const headers = { "Authorization": `Bearer ${token}` }

      const response = await axiosInstance.post(`/story/${storyData.slug}/like`, {}, { headers: headers })

      const { data } = response



      if (!response.data.data.isLiked) {
        dispatch(isLiked(false))
      } else if (response.data.data.isLiked) {
        dispatch(isLiked(true))
      } else {
        dispatch(isLiked(false))
      }
      console.log(response.data.data.story.likeCount)
      dispatch(countOfLike(response.data.data.story.likeCount))



    } catch (error) {
      axiosError(error)
      if (!userData.username) {
        return "you can't like"

      }
    }

  }
  async function forShowPostDelelte() {

    console.log("show delete")
    if (userData.username == storyData.author) {
      setShowDelete(true)
      console.log("user == author")

    }

  }

  async function fetchDetailStory() {
    try {
      const { data } = await axiosInstance.post(`/story/${storyData.slug}`, { activeUser: storyData.author })


      setContent(data.data.content)
      setTitle(data.data.title)
      console.log(data.data.commentCount)
      dispatch(countOfLike(data.data.likeCount))
      setCommentCount(data.data.commentCount)
      dispatch(countOfComment(data.data.commentCount))
    } catch (error) {
      axiosError(error)
    }
  }
  const postDeleteHandler = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        console.log("no token found")
        return
      }
      if (storyData.author !== userData.username) {
        console.log("story.author is not equals to user.username")
        return
      }
      const headers = { "Authorization": `Bearer ${token}` }

      const response = await axiosInstance.delete(`/story/${storyData.slug}/delete`, { headers: headers })
      console.log("got the response for delete")
      router.push("/")

    } catch (error) {

      axiosError(error)


    }

  }

  useEffect(() => {
    fetchDetailStory()
  }, [likeClickHandler, storyData.commentCount])
  useEffect(() => {
    dispatch(countOfLike(storyData.likeCount))
    console.log(storyData.likeCount)
    console.log(storyData)
    if (!userData.username) {
      dispatch(isLiked(false))
    }
  }, [storyData])
  useEffect(() => {
    forShowPostDelelte()
  }, [showDelete])
  useEffect(() => {

    setCommentCount(commentData?.commentList?.length)
    console.log("new comment")
  }, [commentData])


  const router = useRouter()
  return (
    <div className="max-h-screen overflow-hidden">
      <MainHeader />
      <div className='bg-gray-100 max-h-screen'>
        <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-screen'>
          <div className=' col-start-1 col-end-3 grid justify-self-start'>
            <div className="grid grid-rows-12 ">
              <div className="grid grid-flow-row h-[100px]  ">
                <div className="" >
                  <span className={classNames('cursor-pointer',
                    {
                      'text-red-700 font-bold': storyData.liked
                    })} onClick={() => likeClickHandler()}>{storyData.liked ? "liked" : "like"}</span>
                  <span className="ml-2">{storyData.likeCount}</span>
                </div>
                <div className="grid grid-flow-col gap-1">
                  <div onClick={commentClickHandler} className=" cursor-pointer">
                    Comment
                  </div>
                  <div>{commentCount}</div>

                </div>
                <div className="" >Save</div>
              </div>
            </div>
          </div>
          <div className=' col-start-3 col-end-10 max-h-[800px] overflow-scroll'>
            <div>
              <Card>
                <CardHeader>
                  <div className="grid grid-cols-9">

                    <CardTitle className=" col-span-8"> {title}</CardTitle>
                    <div className={classNames('cursor-pointer ', {
                      'invisible': !showDelete
                    })} onClick={postDeleteHandler}>delete</div>
                  </div>
                </CardHeader>
                <CardContent>
                  {content}
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
            <CommentInPost />
          </div>
          <div className="col-start-11 col-end-13 max-h-screen ">
            <div className="col-start-11 col-end-13">
              <h2 className="text-lg font-medium">Author of the post</h2>
              <p>{storyData.author}</p>
            </div>

          </div>
        </div>
      </div>
    </div>


  )
}
