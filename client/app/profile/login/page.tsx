
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { redirect, useRouter } from "next/navigation"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().min(4, { message: "email must be 4 characters" }),
  password: z.string().min(4, { message: "must 4 characters" })
})

async function forLogin({ email, password }) {
  try {

    const { data } = await axiosInstance.post("/auth/login", { email, password })
    const { token } = data ? data : null
    console.log(token)
    const savedToken = localStorage.getItem("token") ?? null
    // localStorage.setItem("token", "")
    if (!savedToken) {
      localStorage.setItem("token", token)
    } else {
      localStorage.setItem("token", token)
    }
    const tok = localStorage.getItem("token")
    console.log(tok)
  } catch (error) {
    axiosError(error)
  }
}

export default function ProfileForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    forLogin(values)
    // redirect('/home')
    router.push('/', { scroll: true })
  }

  return (<>
    <div className="container mx-auto p-4 mb-4  w-11/12 ">
      {/* Your content here */}
      <div className='grid grid-cols-2  w-full place-content-between'>
        <div className=''>
          <Button>Blog</Button>
        </div>
        <div className='place-self-end '>
          <Button><Link href="/profile">profile</Link>
          </Button>
          <Button className='mx-2'>
            <Link href={`/post`}>Create Post</Link>
          </Button>
          <Button className='mx-2'>
            <Link href={`/users`}>total users</Link>
          </Button>
          <Button className='mx-2'>
            <Link href={`/profile/register`}>register</Link>
          </Button>
          <Button className='mx-2'>
            <Link href={`/profile/login`}>login</Link>
          </Button>

        </div>
      </div>

    </div>
    <div className=" my-6 grid grid-cols-1  place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>

                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>

                <FormLabel>password</FormLabel>
                <FormControl >
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>

            )}
          />
          <div className="grid grid-cols-2 gap-4 content-between">

            <Button type="submit">Login</Button>
            <Button>
              <Link href={'/'}>Home</Link>
            </Button>
          </div>
        </form>

      </Form>
    </div>
  </>
  )
}
