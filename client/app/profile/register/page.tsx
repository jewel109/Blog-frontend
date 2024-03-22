
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
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { store, useAppDispatch } from "@/app/store/store"
import type { RootState } from "@/app/store/store"
import { registerUser, } from "@/app/features/userSlice"


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
  const data = useSelector((state: RootState) => state.userReducer)
  if (!data) {
    return new Error("state data is not found")
  }
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

      const data = await dispatch(registerUser(values))
      await dispatch(registerUser(values))
      // console.log(data)

    } catch (error) {
      console.log(error)
    }
  }

  return (<>

    <div className=" mt-36 grid grid-cols-1  place-items-center">


      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-[500px]">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>

                <FormMessage />
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

            <Button type="submit" className="col-end-1">Register</Button>
            <p className="col-span-2 text-blue-300 hover:text-blue-500 mt-1">
              <Link href={'/profile/login'}>Have Account? Login</Link>
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
