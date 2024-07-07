import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchI {
  filter: string
}

const searchState: SearchI = {
  filter: "user"
}



const searchSlice = createSlice({
  "name": "searchSlice", initialState: searchState, reducers: {
    filterSearchState(state, { payload }: PayloadAction<"user" | "post" | "comment">) {
      state.filter = payload
    }
  }
})


export const { filterSearchState } = searchSlice.actions

export const searchReducer = searchSlice.reducer
