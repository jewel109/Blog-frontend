
"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import axiosInstance from "@/lib/axios"
import axiosError from "@/lib/axiosError"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { registerUser, } from "@/lib/features/userSlice"
import { type RootState, useAppDispatch } from "@/lib/store/store"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { toast } from "@/components/ui/use-toast"


const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(4, { message: "email must be 4 characters" }),
  password: z.string().min(4, { message: "must 4 characters" })
})

// async function forRegister({ username, email, password }) {
// }

export default function ProfileForm() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const userState = useSelector((state: RootState) => state.userReducer)
  const [error, setError] = useState<null | any>(null)

  // console.log(data)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)

    try {

      await dispatch(registerUser(values))
      // console.log(data)

      form.resetField("username")
      form.resetField("email")
      form.resetField("password")
      router.push("/")
    } catch (error) {
      console.log(error)
      setError("got error")
    }
  }
  useEffect(() => {
    if (userState.error) {
      console.log(userState.error)
      toast({
        description: "May be server error"
      })
    }
  }, [])

  return (<>
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up to your account
            </h1>

            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel >Username</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </FormControl>

                      <FormMessage className="dark:text-red-500" />
                    </FormItem>

                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>

                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </FormControl>
                      <FormMessage className="dark:text-red-500" />
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
                        <Input {...field} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </FormControl>
                      <FormMessage className="dark:text-red-500" />
                    </FormItem>

                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                </div>
                <div className="">

                  <Button type="submit" className="w-full text-white bg-primary hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-primary-200 dark:focus:ring-primary-800">Register</Button>
                  <div className=" mt-1 flex flex-row justify-between">
                    <div className=" hover:text-blue-500 inline-block">

                      <Link href={'/login'} >Have Account? Login</Link>
                    </div>
                    <div className="hover:text-blue-500 inline-block">

                      <Link href={'/'}>Home</Link>
                    </div>
                  </div>

                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>

  </>

  )
}
