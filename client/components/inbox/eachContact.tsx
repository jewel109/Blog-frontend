"use client"

import { useAppDispatch } from "@/lib/store/store"
import { DataItem } from "./contactList"
import { setChatUser } from "@/lib/features/chatSlice"
import classNames from "classnames"

import { type RootState } from "@/lib/store/store"
import { useSelector } from "react-redux"
import { useEffect, useRef } from "react"
export const EachContact: React.FC<DataItem> = ({ username, email }) => {
  const chatData = useSelector((state: RootState) => state.chatReducer)

  const dispatch = useAppDispatch()

  const contactRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (username === chatData.username && contactRef.current) {
      contactRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [chatData.username, username]);


  return (
    <li ref={contactRef} className={classNames("py-5 bg-gray-200 dark:bg-gray-800 rounded px-1 ", {
      "dark:bg-gray-900 bg-gray-900": username === chatData.username
    })}>
      <div className="flex items-center " onClick={() => {
        dispatch(setChatUser(username))
      }}>
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
          <p className="text-sm font-bold text-gray-400 truncate cursor-pointer dark:text-gray-500" >
            {username}
          </p>
          <p className="text-sm text-gray-500 font-medium dark:text-gray-400 cursor-pointer line-clamp-1 ">
            {email}
          </p>
        </div>
      </div>
    </li>




  )
}
