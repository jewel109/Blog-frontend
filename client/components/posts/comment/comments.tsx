"use client"

import { EachComment } from "./eachComment"
import { getAllCommentOfaStory, resetScrollToCommentsSection } from "@/lib/features/commentSlice"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import _default from "next/dist/shared/lib/runtime-config.external"
import { useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { CommentForm } from "./commentForm"


export const Comments: React.FC = () => {
  const commentData = useSelector((state: RootState) => state.commentReducer)
  const storyData = useSelector((state: RootState) => state.storyReducer)

  const userData = useSelector((state: RootState) => state.userReducer)

  const commentScroolref = useRef<HTMLDivElement>(null)

  const dispatch = useAppDispatch()

  // console.log(commentData)
  const scrollToComments = useSelector((state: RootState) => state.commentUiReducer);

  useEffect(() => {
    if (scrollToComments) {
      // Ensure ref is available before scrolling
      if (commentScroolref.current) {
        commentScroolref.current.scrollIntoView({ behavior: 'smooth' });
        dispatch(resetScrollToCommentsSection());
      }
    }
  }, [scrollToComments, dispatch]);


  useEffect(() => {
    dispatch(getAllCommentOfaStory({ slug: storyData.slug }))
  }, [])
  //TODO rerender in every comment

  return (
    <div className="dark:bg-gray-900 max-w-full">

      <div className="max-w-2xl mx-auto px-4 ">
        <div className="flex justify-between items-center mb-6 pt-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">Discussion (20)</h2>
        </div>
        <div>
          <CommentForm />
        </div>
        {
          Array.isArray(commentData.commentList) ? commentData.commentList.map(({ _id, content, author, date }) =>
          (<>
            <div ref={commentScroolref}>
              <EachComment key={_id} id={_id} date={date} author={author} content={content} />
            </div>
          </>
          ))
            : <> <p>no comment found</p></>
        }
      </div>
    </div >
  )
}
