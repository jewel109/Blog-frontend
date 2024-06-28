"use client"

import { Accordion, AccordionContent, AccordionItem } from "@radix-ui/react-accordion"
import { forwardRef } from "react"
import { AccordionTrigger } from "../ui/accordion"
import { Popover, PopoverTrigger } from "@radix-ui/react-popover"
import { PopoverContent } from "../ui/popover"
import { type RootState, useAppDispatch } from "@/lib/store/store"
import { filterSearchState } from "@/lib/features/searchSlice"
import { useSelector } from "react-redux"

export const SearchHeader = forwardRef<HTMLInputElement>((props, ref) => {

  const dispatch = useAppDispatch()

  const searchState = useSelector((state: RootState) => state.searchReducer)
  console.log(searchState)

  return (
    <>
      <div className="relative  md:block ">
        <div className="absolute inset-y-0 start-0 flex items-center  ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input ref={ref} type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:outline-none dark:focus:border-blue-500" placeholder="press ctrl+k" />
      </div>
      <Popover >
        <PopoverTrigger>
          <div className="">
            <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-gray-700" id="menu-button" aria-expanded="false" aria-haspopup="true">
              Sort
              <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="">
          <div className="cursor-pointer p-1 hover:text-gray-700" onClick={() => { dispatch(filterSearchState("user")) }}>
            user
          </div>
          <div className="cursor-pointer p-1 hover:text-gray-700" onClick={() => { dispatch(filterSearchState("post")) }}>
            post
          </div>
          <div className="cursor-pointer p-1 hover:text-gray-700" onClick={() => { dispatch(filterSearchState("comment")) }}>
            comment
          </div>
        </PopoverContent>
      </Popover >

    </>
  )
})

SearchHeader.displayName = "SearchHeader"
