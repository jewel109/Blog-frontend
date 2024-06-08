import { createSlice } from "@reduxjs/toolkit";

interface Sidebar {
  clicked: boolean
}

const sidebarState: Sidebar = {
  clicked: false
}

const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: sidebarState,
  reducers: {
    toggleClick(state) {
      state.clicked = !state.clicked
    }
    ,
    closeSidebar(state) {
      state.clicked = false
    }
  }
})



export const { toggleClick, closeSidebar } = sideBarSlice.actions

export const sideBarSliceReducer = sideBarSlice.reducer

