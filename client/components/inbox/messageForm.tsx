"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"

const formSchema = z.object({
  message: z.string().min(1)
})





export const MessageForm: React.FC = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    },
  })



  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    // forLogin(values)
    // redirect('/home')
    // router.push('/', { scroll: true })
  }


  return (
    <div>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          <div className="flex flex-row ">
            <div className="flex-1 bg-gray-900">
              <FormField

                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>

                    <FormControl >
                      <Input placeholder="shadcn" {...field} className="bg-gray-900 rounded-t-none focus:outline-none" />
                    </FormControl>
                    <FormMessage
                    />
                  </FormItem>

                )}

              />
            </div>
            <button className="items-center flex max-h-10 mr-1 rounded px-3 py-2 bg-gray-600 dark:bg-gray-800 shadow ">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g id="Send 01">
                  <path id="icon" d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z" stroke="white" stroke-width="1.6" stroke-linecap="round" />
                </g>
              </svg>
              <h3 className="text-white text-xs font-semibold leading-4 px-2">Send</h3>
            </button>
          </div>
        </form>
      </Form>


    </div>
  )
}
