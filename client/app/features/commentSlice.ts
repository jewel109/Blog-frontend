import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Comment {
  content: string,
  author: string,
  likes: Array<string>,
  likeCount: number,
  stars: number
}

const initialState: Comment = {
  content: "",
  author: "",
  likes: [],
  likeCount: 0,
  stars: 0
}


export const addComment = createAsyncThunk("addComment", async (slug, content, star) => {
  try {
    const token = window?.localStorage.getItem("token")
    if (!token) {
      console.log('token is not found')
      return new Error("no token found")
    }

    const headers = { "Authorization": `Bearer ${token}` }
    const response = await axiosInstance.post(`/comment/${slug}/addcomment`, { content: content, star: star, }, { headers: headers })

    console.log(response)
    if (!response) {
      console.log("response is not found")
      throw new Error("response for sending comment is not valid")
    }
    return response

  } catch (error) {
    console.log("got the error")
    return axiosError(error)
  }


})

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {

      })
      .addCase(addComment.fulfilled, (state) => {

      })
      .addCase(addComment.rejected, (state) => {

      })

  }
})


export default commentSlice.reducer
