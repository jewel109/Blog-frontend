import axiosInstance from "@/lib/axios";
import axiosError from "@/lib/axiosError";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface Story {
  author: string,
  slug: string,
  title: string,
  content: string,
  success: boolean,
  error: string | null,

}
const initialState: Story = {
  author: "",
  slug: "",
  title: "",
  content: "",
  success: false,
  error: null,

}
export const addStory = createAsyncThunk("addStory", async ({ title, content }) => {
  try {
    const token = localStorage.getItem("token") ?? null

    const headers = { "Authorization": `Bearer ${token}` }

    const { data } = await axiosInstance.post("/story/addStory", { title, content }, { headers: headers })

    console.log(data)
    const postData = data.data.content ?? "no data"
    return postData
  } catch (error) {
    axiosError(error)
  }
})

export const fetchAllStories = createAsyncThunk("story", async () => {
  try {
    const { data } = await axiosInstance.get("/story/getAllStories")
    console.log(data.query)
    if (!data) {
      throw new Error("no response found")
    } else if (!data.query) {
      throw new Error("response have no query")
    } else {
      return data.query
    }
  } catch (error) {
    return axiosError(error)
  }

})

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStories.pending, (state: userState) => {
        state.loading = true;
        state.error = null;
        state.success = null;
        console.log(state)
      })
      .addCase(fetchAllStories.fulfilled, (state: userState, action) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(fetchAllStories.rejected, (state: userState, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.log(state)
      });
  },
  extraReducers: (builder) => {

  }
})

export default storySlice.reducer 
