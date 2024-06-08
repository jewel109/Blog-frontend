
"use client"

import { PostType } from "@/lib/data"
import { fetchSlug } from "@/lib/features/storySlice"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import { timeAgo } from "@/lib/utils/dateConvert"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const postData: PostType = {
  id: 0,
  author: "",
  content: "",
  createdAt: "",
  image: "",
  slug: "",
  title: ""
}

export const Post: React.FC<PostType> = ({ author, title, content, createdAt, slug }) => {

  const storyData = useSelector((state: RootState) => state.storyReducer)
  const dispatch = useAppDispatch()
  const router = useRouter()

  return (
    <div>
      <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
        <div className="flex justify-between items-center mb-5 text-gray-500">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800">
            <svg className="mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
            Tutorial
          </span>
          <span className="text-sm">{timeAgo(createdAt)} </span>
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:cursor-pointer dark:text-gray-400" onClick={() => {

          dispatch(fetchSlug(slug))
          router.push(`/post/${slug}`)

        }}>{title}</h2>
        <p className="mb-5 font-light text-gray-500 dark:text-gray-500 line-clamp-1">{content}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img className="w-7 h-7 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-medium dark:text-gray-600">
              {author}
            </span>
          </div>
          <a href="#" className="inline-flex items-center font-medium text-primary-600 dark:text-gray-500 hover:underline">
            Read more
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          </a>
        </div>
      </article> </div>
  )
}

