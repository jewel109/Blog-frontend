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
import { Avatar } from '@/components/ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'




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
    console.log(response.payload)
    setPostData(response.payload)
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
                <Button variant="outline">Create Post</Button>
                <Bell className='mt-1' size="38" /> </div>
              <UserRound size="38" />
            </div>
          </nav>
          <main >
            <div className='bg-gray-100'>
              <div className='grid grid-cols-12 w-8/12 mx-auto pt-6 gap-1  min-h-full'>
                <div className=' col-start-1 col-end-3 grid justify-self-start'>
                  <div className='grid grid-rows-12 justify-self-start'>
                    <p className='hover:bg-cyan-300 w-[200px]'>Home</p>
                    <p className='mt-1'>About</p>
                    <p className='mt-1'>Liked</p>
                  </div>
                </div>


                <div className=' col-start-3 col-end-10 text-white '>
                  <Card>
                    <div className='grid grid-cols-12 py-2'>
                      <div className=' col-start-1 col-end-2'>
                        <Avatar className='w-10 h-10 mx-2'>
                          <AvatarImage className='' src="https://github.com/shadcn.png" alt="jewel" />
                          <AvatarFallback></AvatarFallback>
                        </Avatar>
                      </div>
                      <div className='col-start-2 col-end-13'>
                        <p className=' '> raihan</p>
                        <p className=' text-gray-400 text-xs'>2 march 2024</p>
                        <CardTitle className=''>
                          <CardHeader className='pl-0'>PostName</CardHeader>
                        </CardTitle>
                        <CardFooter className='p-0'>
                          <div className='grid grid-flow-col gap-x-5'>
                            <div>like</div>
                            <div>comment </div>
                            <div>save</div>
                          </div>
                        </CardFooter>
                  {postData.map((post) => (

                    <Card className='hover:cursor-pointer'>
                      <div className='grid grid-cols-12 py-2'>
                        <div className=' col-start-1 col-end-2'>
                          <Avatar className='w-10 h-10 mx-2'>
                            <AvatarImage className='' src="https://github.com/shadcn.png" alt="jewel" />
                            <AvatarFallback></AvatarFallback>
                          </Avatar>
                        </div>
                        <div className='col-start-2 col-end-13'>
                          <p className=' '> raihan</p>
                          <p className=' text-gray-400 text-xs'>2 march 2024</p>
                          <CardTitle className=''>
                            <CardHeader className='pl-0'>{post.title}</CardHeader>
                          </CardTitle>
                          <CardFooter className='p-0'>
                            <div className='grid grid-flow-col gap-x-5'>
                              <div>like</div>
                              <div>comment </div>
                              <div>save</div>
                            </div>
                          </CardFooter>
                        </div>
                      </div>
                    </div>

                  </Card>
                    </Card>

                  ))}


                </div>



                <div className=' col-start-10 col-end-13'>
                  <Card className='rounded-b-none p-4'>
                    <h3 className='text-xl font-medium'>Other posts</h3>

                  </Card>

                  <Card className='rounded-none p-3'>
                    <p>so many posts</p>

                  </Card>
                </div>

              </div>

            </div>
          </main >
        </div>
      </Provider>

    </>
  )
}

