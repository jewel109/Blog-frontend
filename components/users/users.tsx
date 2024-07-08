"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { EachUserData } from "./eachUserData"
import axiosError from "@/lib/axiosError"
import { AxiosError } from "axios"
import axiosInstance from "@/lib/axios"
import { useSelector } from "react-redux"
import { type RootState } from "@/lib/store/store"
export type DataItem = {
  username: string,
  email: string,
}
export const Users: React.FC = () => {
  const userData = useSelector((state: RootState) => state.userReducer)
  const [data, setData] = useState<DataItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const divRef = useRef<HTMLDivElement>(null);

  const loadMoreData = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    try {
      const { data } = await axiosInstance.post(`/user/users?page=${page}`, { username: userData.username })
      setData((prevData) => [...prevData, ...data.users]);
      setPage((prevPage) => prevPage + 1);
      if (data.users.length === 0) {
        setHasMore(false);
      }
      console.log(page, loading, hasMore)
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [page, loading])


  useEffect(() => {
    const handleScroll = () => {
      if (divRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = divRef.current;

        console.log(scrollTop, scrollHeight, clientHeight)

        if (scrollTop + clientHeight >= scrollHeight - 5 && hasMore) {
          loadMoreData()
        }
      }
    };

    const divElem = divRef.current
    divElem?.addEventListener('scroll', handleScroll);
    return () => divElem?.removeEventListener('scroll', handleScroll);
  }, [loadMoreData, hasMore]);


  useEffect(() => {
    loadMoreData()
  }, [])


  return (
    <div ref={divRef} className="w-full max-w-3xl p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-20 overflow-auto  max-h-[80vh]">

      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">List of Users</h5>
        <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div className="flow-root" >
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">

          {
            data.map(({ username, email }) => (
              <EachUserData email={email} username={username} />
            )

            )
          }
        </ul>
      </div>
    </div>
  )
}
