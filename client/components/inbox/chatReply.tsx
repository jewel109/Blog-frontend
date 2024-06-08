"use client"

import axiosInstance from "@/lib/axios"
import { useEffect } from "react"

type ChatT = {
  message: string,
  username: string
}
export const ChatReply: React.FC<ChatT> = ({ username, message }) => {


  // console.log(username, message)

  return (
    <div className="chat-message">
      <div className="flex items-end justify-end">
        <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
          <div><span className="inline-block rounded-lg font-medium tracking-tight leading-4 rounded-br-none bg-indigo-700 px-4 py-2 text-gray-400">{message}</span></div>
        </div>
        {/* <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 h-6 w-6 rounded-full" /> */}
        <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
          {username}              </p>


      </div>
    </div>


  )
}
