
"use client"

import type { RootState } from "@/app/store/store"
import { useAppDispatch } from "@/app/store/store"
import axiosError from "@/lib/axiosError"
import { makeAxiosRequest } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
interface Istory {
  _id: string,
  content: string,
  title: string,
  createdAt: string,
  author: string,
  slug: string
}
const initialStories: Istory = {
  _id: "",
  content: "",
  title: "",
  createdAt: "",
  author: "",
  slug: ""

}
type storiesData = Array<Istory>

export default function TotalSavedStories() {
  const postUserData = useSelector((state: RootState) => state.postUserDetailsReducer)
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [stories, setStories] = useState<storiesData>()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await makeAxiosRequest<storiesData>("post", "/user/showReadList", { username: postUserData.name }).catch(err => axiosError(err))
      console.log(data)
      if (data) setStories(data)
    }
    fetchData()
  }, [])

  return (
    <>
      {
        stories?.map(({ _id, author, content, createdAt, slug, title }: Istory) => (
          <li>{title}</li>
        )

        )
      }
    </>
  )

}
