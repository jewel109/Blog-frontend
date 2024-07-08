"use client"

import { toast } from "@/components/ui/use-toast"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { EachComment } from "./eachComment"

type AllRepliesType = {
  comment_id: string
}
export const AllReplies: React.FC<AllRepliesType> = ({ comment_id }) => {

  const [replies, setReplies] = useState([])

  console.log(comment_id)
  useEffect(() => {
    const fetchReplies = async () => {
      try {
        const data = await axiosInstance.get(`/comment/${comment_id}/getallreplies`)
        console.log(data.data)
        setReplies(data.data.allReply)

      } catch (err) {
        const error = err as AxiosError
        console.log("onSubmit " + error)
        axiosError(error)
        toast({
          description: "Replies can't be fetched"
        })
      }
    }
    fetchReplies()
  }, [])


  return (
    <div>
      {
        replies && replies.map(({ _id, author, date, content }) => (
          <div>
            <EachComment key={_id} author={author} content={content} date={date} id={_id} />
          </div>
        ))

      }
    </div>
  )
}
