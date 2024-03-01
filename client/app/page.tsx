"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from "react"
import Profile from './profile/page'
import { Button } from '@/components/ui/button'
import { Provider, useSelector } from 'react-redux'
import { Model, createServer } from "miragejs"
import { store, useAppDispatch } from './store/store'
import axiosInstance from '@/lib/axios'
import axiosError from '@/lib/axiosError'
import type { RootState } from "./store/store"
import { Bell, UserRound } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useRouter } from 'next/navigation'
import { accessUser } from './features/userSlice'
import { fetchAllStories } from './features/storySlice'
import { Input } from '@/components/ui/input'




export default function Home() {
  const [postData, setPostData] = useState([])
  const [user, setUser] = useState(null)
  const data = useSelector((state: RootState) => state.userReducer)
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const dispatch = useAppDispatch()
  const router = useRouter()
  function commentHandler() {
    router.push("/comment/addComment")
  }
  async function forPrivateData() {
    try {

      const token = localStorage.getItem("token")

      console.log(token)
      const { data } = await axiosInstance.get("/auth/private", { headers: { "Authorization": `Bearer ${token}` } })
      console.log(data?.user?.username)
      setUser(data?.user?.username)
    } catch (error) {
      axiosError(error)
    }
  }
  async function getAccessServer() {
    const data = await dispatch(accessUser())
    console.log(data)
    if (!data) {
      return new Error("no data found from getAccessServer")
    }
    return data
  }
  async function forAllStories() {
    const response = await dispatch(fetchAllStories())
    console.log(response)
  }
  async function likeHandler(slug) {
    try {
      const token = localStorage.getItem("token")
      console.log(token)
      const headers = { "Authorization": `Bearer ${token}` }

      const response = await axiosInstance.post(`/story/${slug}/like`, {}, { headers: headers })
      console.log(response)

    } catch (error) {
      axiosError(error)
    }
  }

  useEffect(() => {
    try {
      forPrivateData()
      getAccessServer()

    }
    catch (e) {
      console.error(e)
    }
  }, [forPrivateData])


  useEffect(() => {
    try {
      forAllStories()

    } catch (error) {
      console.log(error)
    }
  }, [])
  console.log('postdata ' + postData)
  return (
    <>
      <Provider store={store}>
        <div className='' >
          <nav className='mt-4 mb-2 w-8/12 mx-auto grid grid-cols-2'>
            <div className='grid grid-cols-6 '>
              <div>
                <Button>Blog</Button>
              </div>
              <Input className=' -ml-4 w-5/6 col-start-2 col-end-6  '></Input>
            </div>
            <div className='grid grid-flow-col justify-self-end '>
              <div className='grid grid-flow-col gap-x-1'>
                <Button>Create Post</Button>
                <Bell className='mt-1' size="38" /> </div>
              <UserRound size="38" />
            </div>
          </nav>
          <main >
            <div className='bg-gray-100'>
              <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-screen'>
                <div className=' col-start-1 col-end-3 grid justify-self-start'>
                  <div className='grid grid-rows-12 justify-self-start'>
                    <Button variant="outline" className='bg-gray-100 '>Home</Button>
                    <Button variant="outline" className='mt-1'>About</Button>
                    <Button variant="outline" className='mt-1'>Liked</Button>
                  </div>
                </div>


                <div className='bg-white rounded-2xl col-start-3 col-end-10 text-white '>
                  hei what's going on
                </div>


                <div className=' col-start-10 col-end-13'>
                  latest post
                </div>

              </div>

            </div>
          </main >
        </div>
      </Provider>

    </>
  )
}

