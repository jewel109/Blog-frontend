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

    const tok = localStorage.getItem("token")
    const token = tok ? tok : null
    console.log(token)
    const { data } = await axiosInstance.get("/auth/private", { headers: { "Authorization": `Bearer ${token}` } })
    console.log(data?.user?.username)
  } catch (error) {
    axiosError(error)
  }
}


export default function Home() {


  let [users, setUsers] = useState([])

  useEffect(() => {
    try {
      forPrivateData()
    }
    catch (e) {
      console.error(e)
    }
  }, [])
  return (
    <>
      <Provider store={store}>
        <main >
          <div>
            <Button><Link href="/profile">profile</Link>
            </Button>
            <Button className='mx-2'>
              <Link href={`/blog/create-blog`}>Create Blog</Link>
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
              <Link href={`/chat`}>chat</Link>
            </Button>

          </div>
          <ul>
            {users.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>

        </main >
      </Provider>
    </>
  )
}
