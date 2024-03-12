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
import { countOfLike, isLiked } from "@/app/features/storySlice"
import CommentInPost from "./commentInPost"
export default function Page() {
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const dispatch = useAppDispatch()
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  console.log(storyData)

  async function commentClickHandler() {
    const commentBox = document.getElementById("comment-box")
    commentBox?.scrollIntoView({ behavior: "smooth" })
  }
  async function likeClickHandler() {
    try {
      const token = localStorage.getItem("token")
      const headers = { "Authorization": `Bearer ${token}` }

      const response = await axiosInstance.post(`/story/${storyData.slug}/like`, {}, { headers: headers })

      const { data } = response



      if (!response.data.data.isLiked) {
        dispatch(isLiked(false))
      } else {
        dispatch(isLiked(true))
      }
      console.log(response.data.data.story.likeCount)
      dispatch(countOfLike(response.data.data.story.likeCount))



    } catch (error) {
      axiosError(error)
    }

  }

  async function fetchDetailStory() {
    try {
      const { data } = await axiosInstance.post(`/story/${storyData.slug}`, { activeUser: storyData.author })

      setContent(data.data.content)
      setTitle(data.data.title)
      console.log(data.data.content)
    } catch (error) {
      axiosError(error)
    }
  }
  useEffect(() => {
    fetchDetailStory()
  }, [])
  useEffect(() => {
    dispatch(countOfLike(storyData.likeCount))
  }, [storyData])


  const router = useRouter()
  return (
    <div>
      <MainHeader />
      <div className='bg-gray-100'>
        <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-screen'>
          <div className=' col-start-1 col-end-3 grid justify-self-start'>
            <div className="grid grid-rows-12 ">
              <div className="" >
                <span className={classNames('cursor-pointer',
                  {
                    'text-red-700 font-bold': storyData.liked
                  })} onClick={() => likeClickHandler()}>{storyData.liked ? "liked" : "like"}</span>
                <span className="ml-2">{storyData.likeCount}</span>
              </div>
              <div>Comment</div>
              <div onClick={commentClickHandler}>Comment</div>
              <div>Save</div>
            </div>
          </div>
          <div className=' col-start-3 col-end-10 '>
            <Card>
              <CardHeader>
                <CardTitle> {title}</CardTitle>
              </CardHeader>
              <CardContent>

                {content}
              </CardContent>
              <CardFooter>
              </CardFooter>
            </Card>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle> {title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {content}
                </CardContent>
                <CardFooter>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="col-start-11 col-end-13"> rana</div>
          <div className="col-start-11 col-end-13">rana</div>
        </div>
      </div>
    </div>

  )
}
