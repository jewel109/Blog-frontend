"use client"

import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { useRouter } from "next/navigation"
import { useSelector } from "react-redux"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import axiosInstance from "@/lib/axios"
import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import axiosError from "@/lib/axiosError"
import classNames from "classnames"

export const LikedButton: React.FC = () => {
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const userData = useSelector((state: RootState) => state.userReducer)

  const [liked, setLiked] = useState(false)

  const router = useRouter()

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

      const { data: { message, isLiked } } = await axiosInstance.post<{ message: string, isLiked: boolean }>(`/story/${storyData.slug}/like`, {}, { headers: headers })



      console.log(message)

      setLiked(isLiked)

      const variant = isLiked ? "success" : "destructive"

      toast({
        description: `${message}`,
        variant: variant
      })




    } catch (err) {

      const error = err as AxiosError
      toast({
        description: "you cannot like now server error"
      })
      console.log("likeClickHandler " + error)
      axiosError(error)
      if (!userData.username) {
        toast({
          description: "You haven't logged in yet"
        })

      }
    }
  }
  useEffect(() => {
    const fetchLikeStatus = async () => {

      try {
        const token = localStorage.getItem("token")

        const headers = { "Authorization": `Bearer ${token}` }

        const { data: response } = await axiosInstance.get<{ likeStatus: boolean, message: string }>(`/story/${storyData.slug}/likeStatus`, { headers: headers })
        console.log(response)

        setLiked(response.likeStatus)

      } catch (error) {

        console.log(error)
        axiosError(error as AxiosError)
      }
    }
    fetchLikeStatus()
  }, [liked])


  return (
    <div className="flex items-center space-x-4 " >
      <span className={classNames("bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-700 dark:text-gray-400", {

        "dark:text-green-500 text-green-800": liked
      })} >
        <svg viewBox="0 0 24 24" onClick={() => likeClickHandler()} className={classNames("w-4 h-4 mr-1 fill-current  inline-flex text-xs cursor-pointer", {
        },
        )} xmlns="http://www.w3.org/2000/svg"><title /><path fillRule="evenodd" clipRule="evenodd" d="M24,11.034a2.5,2.5,0,0,0-2.5-2.5H15.189a.25.25,0,0,1-.237-.328,8.684,8.684,0,0,0,.52-4.407c-.588-2.095-1.834-2.7-2.809-2.565A2,2,0,0,0,11,3.284C11,6.03,8.871,9.03,6.966,10.345a.5.5,0,0,0-.216.412V20.873a.5.5,0,0,0,.405.491c.357.069.681.135.987.2a17.309,17.309,0,0,0,4.108.471h6.5c1.957,0,2.25-1.1,2.25-1.75a2.24,2.24,0,0,0-.232-.994,2.248,2.248,0,0,0,1-3A2.252,2.252,0,0,0,23,14.284a2.226,2.226,0,0,0-.273-1.072A2.5,2.5,0,0,0,24,11.034Z" /><path d="M5.25,10.784a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v11a1,1,0,0,0,1,1H4.25a1,1,0,0,0,1-1Zm-1.5,9.25a.75.75,0,1,1-.75-.75A.75.75,0,0,1,3.75,20.034Z" /></svg>
        {liked ? "liked" : "like"}
      </span>
    </div >

  )
}
