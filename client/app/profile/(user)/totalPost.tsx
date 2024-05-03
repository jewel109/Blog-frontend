
"use client"

import { PostComponet } from "@/app/(page)/helper"
import { fetchSlug, fetchUser } from "@/app/features/storySlice"
import { useAppDispatch, type RootState } from "@/app/store/store"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export function TotalPost() {

  const postUserData = useSelector((state: RootState) => state.postUserDetailsReducer)
  const router = useRouter()
  const dispatch = useAppDispatch()
  console.log(postUserData.name)

  const [totalStory, setTotalStory] = useState<Array<{ _id: string, content: string, title: string, createdAt: string, author: string, slug: string }>>([{ _id: "", content: "", title: "", createdAt: "", slug: "", author: "" }])

  const [total, setTotal] = useState<number>(0)
  const fetchTotalPost = async () => {
    try {
      const token = window?.localStorage?.getItem("token");
      const headers = { "Authorization": `Bearer ${token}` }


      const { data: { story, total }
      } = await axiosInstance.post("user/totalPostedStory", { username: postUserData.name }, { headers: headers })

      console.log(story, total)

      setTotalStory(story)
      setTotal(total)
    } catch (error) {
      console.error(error)
      axiosError(error as AxiosError)
    }
  }

  useEffect(() => {
    fetchTotalPost()
  }, [])

  return (
    <div>
      <Card className="mb-5">
        <CardTitle className="p-5 leading-20">
          total {total} post
        </CardTitle>
      </Card>
      {
        totalStory.map(({ _id, content, title, createdAt, slug, author }) => (


          //  <Card key={_id}>
          //    <CardHeader>
          //     <div className="grid grid-cols-9">
          //
          //               <CardTitle className=" col-span-8"> {title}</CardTitle>

          //            </div>
          //         </CardHeader>
          //        <CardContent>
          //         {content}
          //      </CardContent>
          //     <CardFooter>
          //    </CardFooter>
          // </Card>

          <PostComponet detailPostHandler={() => {
            dispatch(fetchSlug(slug))
            dispatch(fetchUser(author))
            router.push(`/post/${slug}`)

          }} _id={_id} key={_id} title={title} author={author} createdAt={createdAt} slug={slug} />
        )

        )
      }
    </div>
  )
}
