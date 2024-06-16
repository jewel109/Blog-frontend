"use client"
import { scrollToCommentsSection } from "@/lib/features/commentSlice"
import { useAppDispatch, type RootState } from "@/lib/store/store"
import { useSelector } from "react-redux"

export const CommentButton: React.FC = () => {
  const commentData = useSelector((state: RootState) => state.commentUiReducer)
  const dispatch = useAppDispatch()

  console.log(commentData.scroll)

  return (
    <div className="flex items-center ">
      <span className="bg-primary-100 text-primary-800 text-xs cursor-pointer font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-700 dark:text-gray-400" onClick={() => {
        dispatch(scrollToCommentsSection())
      }}>
        <svg version="1.1" className="fill-current w-4 h-4 mt-[4px] mr-1 inline-flex" viewBox="0 0 24 24" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><g id="info" /><g id="icons"><path d="M20,1H4C1.8,1,0,2.8,0,5v10c0,2.2,1.8,4,4,4v3c0,0.9,1.1,1.3,1.7,0.7L9.4,19H20c2.2,0,4-1.8,4-4V5   C24,2.8,22.2,1,20,1z M14,13H8c-0.6,0-1-0.4-1-1c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1C15,12.6,14.6,13,14,13z M16,9H8   C7.4,9,7,8.6,7,8c0-0.6,0.4-1,1-1h8c0.6,0,1,0.4,1,1C17,8.6,16.6,9,16,9z" id="message" fill="currentColor" /></g></svg>            Comment
      </span>
    </div>

  )
}
