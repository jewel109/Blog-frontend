"use client"

import { MessageForm } from "./messageForm"

export const ChatBox: React.FC = () => {

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
                Neil Sims
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
      {/* chat header */}

      <div>

        <div className="p-3 min-h-[73vh] md:max-h-[59vh] md:min-h-[59vh]  overflow-auto">

          <div className="chat-message">
            <div className="flex items-end justify-end">
              <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
                <div><span className="inline-block rounded-lg font-medium tracking-tight leading-4 rounded-br-none bg-indigo-700 px-4 py-2 text-gray-400">yes, I have a mac. I never had issues with root permission as well, but this helped me to solve the problem</span></div>
              </div>
              <img src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="order-2 h-6 w-6 rounded-full" />
            </div>
          </div>

          <div className="chat-message">
            <div className="flex items-end">
              <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                <div><span className="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-800 text-gray-400">Thanks for your message David. I thought I'm alone with this issue. Please, ? the issue to support it :)</span></div>
              </div>
              <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="My profile" className="w-6 h-6 rounded-full order-1" />
            </div>
          </div>




        </div>

      </div>
      <MessageForm />
    </div>

  )
}


