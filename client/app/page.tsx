"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from "react"
import Profile from './profile/page'
import { Button } from '@/components/ui/button'
import { Provider } from 'react-redux'
import { Model, createServer } from "miragejs"
import { store } from './store/store'
import axiosInstance from '@/lib/axios'
import axiosError from '@/lib/axiosError'
import { within } from '@testing-library/react'
async function forPrivateData() {
  try {

    const token = localStorage.getItem("token")

    console.log(token)
    const { data } = await axiosInstance.get("/auth/private", { headers: { "Authorization": `Bearer ${token}` } })
    console.log(data?.user?.username)
  } catch (error) {
    axiosError(error)
  }
}



export default function Home() {
  const [postData, setPostData] = useState([])

  async function forAllStories() {
    try {
      const { data } = await axiosInstance.get("/story/getAllStories")
      console.log(data.query)
      setPostData(data.query)
    } catch (error) {
      axiosError(error)
    }
  }


  useEffect(() => {
    try {
      forPrivateData()

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
        <main >
          <div>
            <Button><Link href="/profile">profile</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/post`}>Create Post</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/users`}>total users</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/users/connected-users`}>connected users</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/profile/register`}>register</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/profile/login`}>login</Link>
            </Button>

          </div>
          <ul>
            {postData.map((post) => (
              <li key={post._id}>{post.title} hei</li>
            ))}
            <span>hei</span>
          </ul>

        </main >
      </Provider>
    </>
  )
}
