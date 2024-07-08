
"use client"

import type { RootState } from "@/app/store/store";
import { Card, CardHeader } from "@/components/ui/card";
import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function TotalComment() {
  const postUserData = useSelector((state: RootState) => state.postUserDetailsReducer)
  const [total, setTotal] = useState<number>(0)
  const [comments, setComments] = useState<Array<Icomment>>([{ _id: "", content: "", author: "" }])

  interface Icomment {
    _id: string,
    content: string,
    author: string
  }
  interface ITotalComment {
    comments: Array<Icomment>,
    total: number
  }

  const fetchTotalComment = async () => {
    try {
      const token = window?.localStorage?.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` }

      const { data: { comments, total } } = await axiosInstance.post<ITotalComment>("/user/totalCommentOfaUser", { username: postUserData.name }, { headers: headers })

      console.log()

      setComments(comments)
      setTotal(total)

    } catch (error) {
      console.error("fetchTotalComment " + error)
      axiosError(error as AxiosError)
    }



  }
  useEffect(() => {
    console.log("called")
    fetchTotalComment()
  }, [])

  return (
    <div>
      <Card className="p-5">Total Comment {total}</Card>
      {comments.map(({ _id, content, author }) => (
        <Card key={_id}>
          <CardHeader>{content}</CardHeader>
        </Card>

      )
      )}
    </div>
  )
}
