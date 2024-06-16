"use client"

import { PostType } from "@/lib/data"
import Link from "next/link"
import { Comments } from "../comment/comments"
import { timeAgo } from "@/lib/utils/dateConvert"
import { LikedButton } from "./likedButton"
import { CommentButton } from "./commentButton"
import { SaveButton } from "./saveButton"

const postData: PostType = {
  id: 0,
  author: "rana",
  content: "Progressive Web Apps (PWAs) are web applications that offer a native app-like experience. They leverage modern web technologies to deliver fast, reliable, and engaging experiences. PWAs can work offline, send push notifications, and be installed on a user's home screen, providing the best of both web and mobile apps. They are designed to be responsive, secure, and capable of performing well on any device, regardless of network conditions. One of the main benefits of PWAs is their ability to work offline, thanks to service workers that cache essential resources and manage network requests. This ensures that users can access the application even without an internet connection, enhancing the user experience and reliability. Push notifications allow PWAs to engage users with timely updates and information, similar to native apps. The ability to be installed on the home screen means that users can launch PWAs just like native apps, without needing to go through an app store. This seamless installation process can lead to higher user engagement and retention. PWAs are built with responsive design principles, ensuring that they provide a consistent and optimal experience across different devices and screen sizes. Security is also a key consideration, with PWAs served over HTTPS to protect user data and ensure safe interactions. By combining the best features of web and mobile apps, PWAs offer a compelling solution for delivering high-quality user experiences on the web.",
  createdAt: "2",
  image: "",
  slug: "",
  title: "Progressive web framework"
}

export const Post: React.FC<PostType> = ({ author, title, content, createdAt }) => (
  <div>
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <div className="flex flex-col">

          <span className="bg-primary-100 text-primary-800  font-medium inline-flex items-center px-2.5 space-x-3 py-0.5 rounded dark:bg-primary-200 dark:text-gray-400 mb-2">
            <img className="w-7 h-7 rounded-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-semibold tex-sm dark:text-gray-400 ">
              {author}
            </span>
            <span className="text-sm  font-light dark:text-gray-500 ml-3">{createdAt} </span>
          </span>

        </div>
        <span>
          <svg className="w-9 h-9 text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M6 12h.01m6 0h.01m5.99 0h.01" />
          </svg>

        </span>
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-400">{title}</h2>
      <p className="mb-5 font-light text-gray-900 dark:text-gray-500 ">{content}</p>
      <div className="flex justify-between items-center">
        <LikedButton />
        <CommentButton />
        <SaveButton />
        <Link href="#" className="hidden  items-center font-medium text-primary-600 dark:text-gray-400 hover:underline">
          Read more
          <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </Link>
      </div>
    </article>
    <section>

      <Comments />
    </section>
  </div>
)


