"use client"

import { useSelector } from "react-redux"
import { Post } from "./post"
import { type RootState } from "@/lib/store/store"
import { useEffect, useState } from "react"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import { LoadingSpinnerAnother } from "@/components/nav/loading"
import { formatDate, timeAgo } from "@/lib/utils/dateConvert"

export const FetchDetailPost: React.FC = () => {

  const storyData = useSelector((state: RootState) => state.storyReducer)
  console.log(storyData)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [date, setDate] = useState("")
  const [author, setAuthor] = useState("")


  async function fetchDetailStory() {

    try {
      const token = localStorage.getItem("token")

      //MEM I got error here cause localStorage was imported from persisted
      const headers = { "Authorization": `Bearer ${token}` }

      const { data: { story: { title, content, author, likeCount, commentCount, createdAt }
      } } = await axiosInstance.post(`/story/${storyData.slug}`, {}, { headers: headers })
      // You have to give headers like this

      // console.log()

      setDate(timeAgo(createdAt))
      setLoading(false)
      setTitle(title)
      setContent(content)
      setAuthor(author)
      // dispatch(countOfLike(likeCount))
      // dispatch(countOfComment(commentCount))
      // setCommentCount(commentCount)

    } catch (err) {
      const error = err as AxiosError
      console.log("fetchDetailStory " + error)
      axiosError(error)

    }
  }
  useEffect(() => {
    fetchDetailStory()
  }, [])
  return (
    <>
      {
        loading ? <LoadingSpinnerAnother /> : <div>
          <Post author={author} title={title} content={content} createdAt={date} />
        </div>

      }
    </>

  )
}
