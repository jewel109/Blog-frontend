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
  comment: z.string().min(20)
})

export const CommentForm: React.FC = () => {

  const userData = useSelector((state: RootState) => state.userReducer)
  const storyData = useSelector((state: RootState) => state.storyReducer)
  const router = useRouter()
  const data = useSelector((state: RootState) => state.userReducer)
  const dispatch = useAppDispatch()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: ""
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
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

    dispatch(addComment({ slug: storyData.slug, content: values.comment }))



    form.resetField("comment")

  }


  return (
    <div>

      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
          <div className=" py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>

                  <FormControl>
                    <Input placeholder="" {...field} {...form.register} className="px-0 w-full text-sm text-gray-900 border-0  focus:outline-none   dark:text-white dark:placeholder-gray-400 dark:bg-gray-800" />
                  </FormControl>
                  <FormMessage />
                </FormItem>

              )}
            />
          </div>
          <button type="submit"
            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-gray-100 bg-gray-900 dark:bg-gray-700 dark:text-gray-300 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
            Post comment
          </button>
        </form>
      </Form>

    </div>
  )
}
