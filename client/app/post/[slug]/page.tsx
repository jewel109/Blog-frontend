"use client"
import { MainHeader } from "@/app/page"
import type { RootState } from "@/app/store/store"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
export default function Page() {
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  console.log(storyData)

  async function likeClickHandler() {
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      const headers = { "Authorization": `Bearer ${token}` }

      const response = await axiosInstance.post(`/story/${storyData.slug}/like`, {}, { headers: headers })

      console.log(response)

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
  const router = useRouter()
  return (
    <div>
      <MainHeader />
      <div className='bg-gray-100'>
        <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-screen'>
          <div className=' col-start-1 col-end-3 grid justify-self-start'>
            <div className="grid grid-rows-12 ">
              <div className="hover:text-red-700 cursor-pointer" onClick={() => likeClickHandler()}>Like</div>
              <div>Comment</div>
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
          </div>
          <div className="col-start-11 col-end-13"> rana</div>
        </div>
      </div>
    </div>

  )
}
