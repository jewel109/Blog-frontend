import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface Comment {
  content: string,
  author: string,
  likes: Array<string>,
  likeCount: number
  commentList: Array<string>
}

const initialState: Comment = {
  content: "",
  author: "",
  likes: [],
  likeCount: 0,
  commentList: [],
}


export const addComment = createAsyncThunk("comment/addComment", async ({ slug, content }) => {
  try {
    const token = window?.localStorage.getItem("token")
    if (!token) {
      console.log('token is not found')
      return new Error("no token found")
    }

    const headers = { "Authorization": `Bearer ${token}` }
    const response = await axiosInstance.post(`/comment/${slug}/addcomment`, { content: content, refModel: "Story" }, { headers: headers })

    console.log(response)
    return response

  } catch (err) {
    const error = err as AxiosError
    console.log("addcomment " + error)
    return axiosError(error)

  }

})


// export const getAllCommentOfaStory = createAsyncThunk("comment/getAllComment", async ({ slug }) => {
//
//   const response = await axiosInstance.get(`/comment/${slug}/getallcomment`)
//
// }

export const getAllCommentOfaStory = createAsyncThunk("comment/getAllComment", async ({ slug }) => {
  try {

    const response = await axiosInstance.get(`/comment/${slug}/getallcomment`)
    console.log(response.data.data)
    return response.data.data

  } catch (err) {
    const error = err as AxiosError
    console.log("getAllCommentOfaStory " + error)
    axiosError(error)
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
      ,
      builder
        .addCase(getAllCommentOfaStory.pending, (state, { payload }) => {
        })
        .addCase(getAllCommentOfaStory.fulfilled, (state, { payload }) => {
          state.commentList = payload
          state.commentCount

        })
  }
})


export default commentSlice.reducer
