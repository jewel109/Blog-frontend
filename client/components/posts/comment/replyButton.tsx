"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion"
import { useState } from "react"
import { ReplyButtonForm } from "./replyButtonForm"
import { AllReplies } from "./allReplies"

type CommentReplyButtonType = {
  comment_id: string
}

export const CommentReplyButton: React.FC<CommentReplyButtonType> = ({ comment_id }) => {

  const [value, setValue] = useState<string>("")

  return (
    <>
      <Accordion type="single" collapsible value={value} onValueChange={setValue}>
        <AccordionItem value="item" className="" >
          <AccordionTrigger className="ml-2" >
            <button type="button"
              className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium">
              <svg className="mr-1.5 w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
              </svg>
              Reply
            </button>

          </AccordionTrigger>


          <AccordionContent className="w-full "  >
            <div className="ml-2">
              <ReplyButtonForm comment_id={comment_id} />
              <AllReplies comment_id={comment_id} />
              <AllReplies comment_id={comment_id} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

    </>

  )
}
