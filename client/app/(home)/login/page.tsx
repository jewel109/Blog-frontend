
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
import { useSelector } from "react-redux"
import { AxiosError } from "axios"
import { type RootState, useAppDispatch } from "@/lib/store/store"
import { accessUser, loginUser } from "@/lib/features/userSlice"

const formSchema = z.object({
  email: z.string().min(4, { message: "email must be 4 characters" }),
  password: z.string().min(4, { message: "must 4 characters" })
})

export default function ProfileForm() {
  const router = useRouter()
  const data = useSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function handleLogin(values: z.infer<typeof formSchema>) {
    const response = await dispatch(loginUser(values))
    console.log(response)
    // dispatch(accessUser())
    router.push("/")
    dispatch(accessUser())
  }
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // forLogin(values)
    handleLogin(values)
    // redirect('/home')
    // router.push('/', { scroll: true })
  }

  return (<>


    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>

            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>

                      <FormLabel>email</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
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
                        <Input {...field} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                      </FormControl>
                      <FormMessage />
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
                  <a href="#" className="text-sm font-medium text-gray-400 hover:underline dark:text-gray-500">Forgot password?</a>
                </div>
                <div className="">

                  <Button type="submit" className="w-full text-white bg-primary hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</Button>
                  <div className=" mt-1 flex flex-row justify-between">
                    <div className=" hover:text-blue-500 inline-block">

                      <Link href={'/register'} >Haven't Account? Sign Up</Link>
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
