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

