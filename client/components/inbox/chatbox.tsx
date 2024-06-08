"use client"

import { useSelector } from "react-redux"
import { MessageForm } from "./messageForm"
import { type RootState } from "@/lib/store/store"
import { useEffect, useState, useRef } from "react"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import { ChatSent } from "./chatSent"
import { ChatReply } from "./chatReply"
import { MobileContactList } from "./mobileContactList"

type ChatData = {
  reciverName: string,
  senderName: string,
  body: string
}

export const ChatBox: React.FC = () => {

  const chatData = useSelector((state: RootState) => state.chatReducer)
  const userData = useSelector((state: RootState) => state.userReducer)
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<ChatData[]>([])


  useEffect(() => {
    const fetchChats = async () => {
      try {
        const { data } = await axiosInstance.post("/user/getMessages", { author: userData.username, sendTo: chatData.username })
        console.log(data.messages)

        setData(data.messages.reverse())

      } catch (error) {
        console.error(error)
        axiosError(error as AxiosError)
      }
    }
    fetchChats()
  }, [chatData.messageSent])


  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [data]);

  return (
    <div className="bg-gray-100 dark:bg-primary-foreground">
      {/* chat header */}
      <div className="flex flex-row rounded items-center bg-gray-200 dark:bg-gray-800 justify-between">
        <div className="py-5  rounded px-1 max-w-sm ">
          <div className="flex items-center ">
            <div className="flex-shrink-0">
              <div className="relative">
                <span className="absolute left-9 bottom-0 right-0 text-green-500">
                  <svg width="12" height="12">
                    <circle cx="6" cy="6" r="6" fill="currentColor"></circle>
                  </svg>
                </span>
                <img className="w-12 h-12 rounded-full" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png" alt="Neil image" />
              </div>
            </div>
            <div className="flex-1 min-w-0 ms-4 space-y-1">
              <p className="text-sm font-bold text-gray-800 truncate dark:text-gray-500">
                {chatData.username}
              </p>
              <p className="text-sm text-gray-500 font-medium dark:text-gray-400 line-clamp-1 ">
                developer              </p>
            </div>

          </div>

        </div>
        <svg className="w-9 h-9 md:w-6 md:h-6  justify-end mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>


      </div>
      <div className="userList-modal md:hidden">
        <MobileContactList />
      </div>
      {/* chat header */}
      <div className="p-3 md:hidden userlist">
        <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 cursor-pointer rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800">UserList</div>

      </div>



      <div>



        <div className="p-3 min-h-[73vh] md:max-h-[59vh] md:min-h-[59vh]  overflow-auto">
          {/* <div className="flex items-center flex-row justify-center"> */}
          {/*   <div className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-800 hover:cursor-pointer" onClick={() => { */}
          {/**/}
          {/*   }}>Load More</div> */}
          {/**/}
          {/* </div> */}
          {
            data.map(({ reciverName, senderName, body }) => {
              // console.log(reciverName, senderName)
              // console.log("chatData userName", chatData.username == reciverName, reciverName
              if (senderName == userData.username) {

                // console.log(reciverName)
                return (<ChatSent username={senderName} message={body} />)


              } else {
                return <ChatReply username={senderName} message={body} />
              }






            })

          }


          <div ref={messagesEndRef} />
        </div >
      </div>
      <MessageForm />
    </div>

  )
}


