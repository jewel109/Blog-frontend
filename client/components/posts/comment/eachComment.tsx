"use client"

import { getAllCommentOfaStory } from "@/lib/features/commentSlice"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { CommentReplyButton } from "./replyButton"

export type CommentType = {
  id: string,
  content: string,
  date: string,
  author: string,
}
export const EachComment: React.FC<CommentType> = ({ id, content, date, author }) => {

  // console.log(id)

  return (
    <article className=" p-6 text-base bg-gray-50 rounded-lg dark:bg-gray-900">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"><img
            className="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
            alt="Michael Gough" />{author}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400"><time title="February 8th, 2022">{date}</time></p>
        </div>
        <div>
          <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </div>
      </footer>
      <p className="text-gray-500 dark:text-gray-400">{content}</p>
      <div className="flex items-center mt-4 space-x-4">
        <CommentReplyButton comment_id={id} />      </div>
    </article>

  )
}
