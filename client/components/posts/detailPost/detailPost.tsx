"use client"

import { Posts } from "../Posts"
import { AuthorPage } from "../author/author"
import { FetchDetailPost } from "./fetchDeatailPost"
import { Post } from "./post"

export const DetaitPost: React.FC = () => (
  <div className="h-full  md:mr-2.5 md:grid md:grid-cols-12 md:mt-[50px]  overflow-x-hidden ">

    <div className="md:col-span-8 ">
      <FetchDetailPost />
    </div>
    <div className="hidden md:grid bg-gray-200 dark:bg-gray-700 md:col-start-9 md:col-end-13">
      <AuthorPage />
    </div>
  </div>
)
