"use client"

import { PostComponet } from "@/app/(page)/helper"
import { fetchSlug, fetchUser } from "@/app/features/storySlice"
import type { RootState } from "@/app/store/store"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

interface Istories {
  story: Array<Istory[]>
}

interface Istory {
  _id: string,
  content: string,
  title: string,
  createdAt: string,
  author: string,
  slug: string
}
type storiesData = Array<Istory>
export default function TotalLikedPost() {

  const postUserData = useSelector((state: RootState) => state.postUserDetailsReducer)
  const dispatch = useDispatch()
  const router = useRouter()
  const [stories, setStories] = useState<storiesData>([])


  const fetchTotalLikedPost = async () => {
    try {
      const { data: { stories, total } } = await axiosInstance.post("/user/totalLikedStory", { username: postUserData.name })

      console.log(stories, total)

      setStories(stories)



    } catch (error) {
      console.log("fetchTotalLikedPost " + error)
      axiosError(error as AxiosError)
    }
  }

  useEffect(() => {
    fetchTotalLikedPost()
  }, [])

  return (
    <>
      {
        stories.map(({ _id, title, content, slug, author, createdAt }: Istory) => (

          < PostComponet title={title} detailPostHandler={() => {
            dispatch(fetchSlug(slug))
            dispatch(fetchUser(author))
            router.push(`/post/${slug}`)

          }} key={_id} author={author} slug={slug} createdAt={createdAt} _id={_id} />
        )

        )

      }
    </>
  )
}
