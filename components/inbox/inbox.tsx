"use client"

import { ChatBox } from "./chatbox"
import { ContactList } from "./contactList"

export const InboxPage: React.FC = () => {

  return (
    <div className="md:p-8 md:pl-12 overflow-hidden">
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-300 pb-2 md:pb-12">Messages</h2>
      <div className="flex flex-row">
        <div className="md:min-w-96">
          <ContactList />
        </div>
        <div className="md:flex-1">
          <ChatBox />
        </div>
      </div>
    </div>
  )
}
