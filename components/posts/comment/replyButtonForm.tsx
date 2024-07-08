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
import { toast } from "@/components/ui/use-toast"
import { ToastAction } from "@radix-ui/react-toast"
import { addComment, getAllCommentOfaStory } from "@/lib/features/commentSlice"
const formSchema = z.object({
  reply: z.string().min(8)
})

type ReplyButtonFormType = {
  comment_id: string
}
export const ReplyButtonForm: React.FC<ReplyButtonFormType> = ({ comment_id }) => {
  const userData = useSelector((state: RootState) => state.userReducer)
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const router = useRouter()
  const data = useSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reply: ""
    },
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // forLogin(values)
    // redirect('/home')
    // router.push('/', { scroll: true })
    if (!userData.username) {
      console.log("no user found")
      toast({
        title: "You are not logged in ",
        action: <ToastAction altText="Log In" onClick={() => { router.push("/profile/login") }}>Log in</ToastAction>
      })

      return
    }

    const savedToken = localStorage.getItem("token")
    const headers = { "Authorization": `Bearer ${savedToken}` }

    const response = await axiosInstance.post(`/comment/${comment_id}/addReplyToAComment`, { slug: storyData.slug, refModel: "Comment", content: values.reply }, { headers: headers })
    console.log(response)
    if (response) {
      toast({
        description: "You have replied",
        variant: "success"
      })
    }



    form.resetField("reply")

  }


  return (
    <div className="">

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
          <div className=" py-2 px-4 mb-2 mt-4 bg-gray-200 rounded-lg rounded-t-lg border border-gray-200  dark:bg-gray-800 dark:border-gray-700">

            <FormField
              control={form.control}
              name="reply"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <Input placeholder="" {...field} {...form.register} className="px-0 w-full text-sm bg-gray-200 text-gray-900 border-0 focus:ring-0 focus:outline-none focus-visible:ring-offset-0 dark:text-white dark:placeholder-gray-900 dark:bg-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
          </div>
          <button type="submit"
            className="inline-flex items-center py-2 px-4 ms-2 text-sm font-medium text-gray-200 focus:outline-none bg-black  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800  dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
            Reply          </button>
        </form>
      </Form>


    </div>
  )
}
