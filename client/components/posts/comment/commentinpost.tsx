"use client"

import { useEffect } from "react"
import { CommentForm } from "./commentForm"
import { Comments } from "./comments"
import { useSelector } from "react-redux"
import { type RootState } from "@/lib/store/store"

export const CommentInPost: React.FC = () => {

  const commentData = useSelector((state: RootState) => state.commentReducer)

  useEffect(() => {
    console.log("doing comment")
  }, [commentData])

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-8 lg:py-16 antialiased">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-gray-400">Discussion (20)</h2>
        </div>
        <CommentForm />
        <Comments />
      </div>
    </section>
  )
}
