  async function forComment(slug, content, star) {
    try {
      const token = window?.localStorage.getItem("token")
      if (!token) {
        console.log('token is not found')
        return new Error("no token found")
      }

      const headers = { "Authorization": `Bearer ${token}` }
      const response = await axiosInstance.post(`/comment/${slug}/addcomment`, { content: content, star: star }, { headers: headers },)

      console.log(response)

    } catch (error) {
      axiosError(error)
    }


  }

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
    forComment("my-post", values.comment, 1)
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                comment
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
