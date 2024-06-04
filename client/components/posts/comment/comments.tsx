"use client"

import { EachComment } from "./eachComment"
import { getAllCommentOfaStory } from "@/lib/features/commentSlice"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import _default from "next/dist/shared/lib/runtime-config.external"
import { useEffect } from "react"
import { useSelector } from "react-redux"


export const Comments: React.FC = () => {
  const commentData = useSelector((state: RootState) => state.commentReducer)
  const storyData = useSelector((state: RootState) => state.storyReducer)

  const userData = useSelector((state: RootState) => state.userReducer)

  const dispatch = useAppDispatch()

  console.log(commentData)


  useEffect(() => {
    dispatch(getAllCommentOfaStory({ slug: storyData.slug }))
  }, [])
  //TODO rerender in every comment

  return (
    <div className="">
      {
        Array.isArray(commentData.commentList) ? commentData.commentList.map(({ _id, content, author, date }) =>
        (<>
          <EachComment key={_id} id={_id} date={date} author={author} content={content} />
        </>
        )) : <> <p>no comment found</p></>
      }
    </div >
  )
}
