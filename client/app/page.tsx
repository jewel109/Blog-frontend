"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from "react"
import Profile from './profile/page'
import { Button } from '@/components/ui/button'
import { Provider } from 'react-redux'
import { Model, createServer } from "miragejs"
import { store } from './store/store'

createServer({

  models: {
    users: Model
  },
  routes() {
    this.get("/api/users", () => [
      { id: "1", name: "Luke" },
      { id: "2", name: "Leia" },
      { id: "3", name: "Anakin" },
    ]),
      this.post("api/register", () => {

        const newUserData = this.request.requestBody;

        // Validate and process user data
        try {
          // ... perform validation and other actions

          // Create a new user record (adapt according to your data model)
          const newUser = { id: 4, ...newUserData };

          // Return a successful response with the new user
          this.response.created('/api/users/4', newUser);
        } catch (error) {
          // Handle errors and return appropriate responses
          this.response.badRequest(error.message);
        }

      })

  },
})

export default function Home() {


  let [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((response) => response.json())
      .then((json) => setUsers(json))
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
