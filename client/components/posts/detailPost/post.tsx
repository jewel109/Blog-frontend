"use client"

import { PostType } from "@/lib/data"
import Link from "next/link"
import { Comments } from "../comment/comments"

const postData: PostType = {
  id: 0,
  author: "rana",
  content: "Progressive Web Apps (PWAs) are web applications that offer a native app-like experience. They leverage modern web technologies to deliver fast, reliable, and engaging experiences. PWAs can work offline, send push notifications, and be installed on a user's home screen, providing the best of both web and mobile apps. They are designed to be responsive, secure, and capable of performing well on any device, regardless of network conditions. One of the main benefits of PWAs is their ability to work offline, thanks to service workers that cache essential resources and manage network requests. This ensures that users can access the application even without an internet connection, enhancing the user experience and reliability. Push notifications allow PWAs to engage users with timely updates and information, similar to native apps. The ability to be installed on the home screen means that users can launch PWAs just like native apps, without needing to go through an app store. This seamless installation process can lead to higher user engagement and retention. PWAs are built with responsive design principles, ensuring that they provide a consistent and optimal experience across different devices and screen sizes. Security is also a key consideration, with PWAs served over HTTPS to protect user data and ensure safe interactions. By combining the best features of web and mobile apps, PWAs offer a compelling solution for delivering high-quality user experiences on the web.",
  createdAt: "2",
  image: "",
  slug: "",
  title: "Progressive web framework"
}

export const Post: React.FC<PostType> = ({ author = postData.author, title = postData.title, content = postData.content, createdAt = postData.createdAt }) => (
  <div>
    <article className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-center mb-5 text-gray-500">
        <div className="flex flex-col">

          <span className="bg-primary-100 text-primary-800  font-medium inline-flex items-center px-2.5 space-x-3 py-0.5 rounded dark:bg-primary-200 dark:text-gray-400 mb-2">
            <img className="w-7 h-7 rounded-full cursor-pointer" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Jese Leos avatar" />
            <span className="font-semibold tex-sm dark:text-gray-400 ">
              {author}
            </span>
            <span className="text-sm  font-light dark:text-gray-500 ml-3">{createdAt} days ago</span>
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
        <div className="flex items-center space-x-4">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-700 dark:text-gray-400">
            <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1 fill-current text-gray-800 dark:text-gray-400 inline-flex text-xs" xmlns="http://www.w3.org/2000/svg"><title /><path fillRule="evenodd" clipRule="evenodd" d="M24,11.034a2.5,2.5,0,0,0-2.5-2.5H15.189a.25.25,0,0,1-.237-.328,8.684,8.684,0,0,0,.52-4.407c-.588-2.095-1.834-2.7-2.809-2.565A2,2,0,0,0,11,3.284C11,6.03,8.871,9.03,6.966,10.345a.5.5,0,0,0-.216.412V20.873a.5.5,0,0,0,.405.491c.357.069.681.135.987.2a17.309,17.309,0,0,0,4.108.471h6.5c1.957,0,2.25-1.1,2.25-1.75a2.24,2.24,0,0,0-.232-.994,2.248,2.248,0,0,0,1-3A2.252,2.252,0,0,0,23,14.284a2.226,2.226,0,0,0-.273-1.072A2.5,2.5,0,0,0,24,11.034Z" /><path d="M5.25,10.784a1,1,0,0,0-1-1H1a1,1,0,0,0-1,1v11a1,1,0,0,0,1,1H4.25a1,1,0,0,0,1-1Zm-1.5,9.25a.75.75,0,1,1-.75-.75A.75.75,0,0,1,3.75,20.034Z" /></svg>
            Like
          </span>
        </div>
        <div className="flex items-center ">
          <span className="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-700 dark:text-gray-400">
            <svg version="1.1" className="fill-current w-4 h-4 mt-[4px] mr-1 inline-flex" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="info" /><g id="icons"><path d="M20,1H4C1.8,1,0,2.8,0,5v10c0,2.2,1.8,4,4,4v3c0,0.9,1.1,1.3,1.7,0.7L9.4,19H20c2.2,0,4-1.8,4-4V5   C24,2.8,22.2,1,20,1z M14,13H8c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1C15,12.6,14.6,13,14,13z M16,9H8   C7.4,9,7,8.6,7,8c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1C17,8.6,16.6,9,16,9z" id="message" fill="currentColor" /></g></svg>            Comment
          </span>
        </div>
        <div className="flex items-center ">
          <span className="dark:text-gray-400 text-xs font-medium inline-flex px-2.5 py-0.5 items-center">
            <svg className="w-[25px] h-[19px] text-gray-800 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clip-rule="evenodd" />
            </svg>

            Save
          </span>
        </div>
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


