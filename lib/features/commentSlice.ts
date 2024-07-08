import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface AllComment {
  _id: string,
  date: string,
  content: string,
  author: string
}
interface UiI {
  scroll: boolean
}
interface Comment {
  content: string,
  author: string,
  likes: Array<string>,
  likeCount: number
  commentList: Array<AllComment>
}

const commentInitialState: Comment = {
  content: "",
  author: "",
  likes: [],
  likeCount: 0,
  commentList: [],
}


interface AddCommentData {
  slug: string,
  content: string
}
export const addComment = createAsyncThunk("comment/addComment", async ({ slug, content }: AddCommentData) => {
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



export const getAllCommentOfaStory = createAsyncThunk("comment/getAllComment", async ({ slug }: { slug: string }) => {
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
  initialState: commentInitialState,
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
      .addCase(getAllCommentOfaStory.fulfilled, (state, { payload }) => {
        state.commentList = payload
        console.log(current(state))
      })
  }
})

interface commentUiStatI {
  scroll: boolean
}

const commentUiState: commentUiStatI = {
  scroll: false
}

const commentUiSlice = createSlice({
  "name": "commentUi", initialState: commentUiState, reducers: {
    scrollToCommentsSection(state) {
      state.scroll = !state.scroll
    },
    resetScrollToCommentsSection(state) {
      state.scroll = false
    }


  }
})

export const { resetScrollToCommentsSection, scrollToCommentsSection } = commentUiSlice.actions

export const commentReducer = commentSlice.reducer
export const commentUiReducer = commentUiSlice.reducer
