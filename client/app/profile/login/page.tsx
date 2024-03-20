
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
import { useAppDispatch } from "@/app/store/store"
import type { RootState } from "@/app/store/store"
import { useSelector } from "react-redux"
import { loginUser } from "@/app/features/userSlice"

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

  async function handleLogin(values) {
    const response = await dispatch(loginUser(values))
    console.log(response)
    router.push("/")
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


    <div className=" mt-36 grid grid-cols-1  place-items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[500px]">
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
          <div className="grid grid-cols-3 gap-4 content-between">

            <Button type="submit" className="col-end-1">Login</Button>
            <p className="col-end-3 col-start-1 text-blue-300 hover:text-blue-500 mt-1">
              <Link href={'/profile/register'}>Have no account ? create one.</Link>
            </p>
            <Button type="button">
              <Link href={'/'}>Home</Link>
            </Button>
          </div>
        </form>

      </Form>
    </div>
  </>
  )
}
