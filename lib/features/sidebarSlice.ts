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
    openSidebar(state) {
      state.clicked = true
    }
    ,
    closeSidebar(state) {
      state.clicked = false
    }
  }
})



export const { openSidebar, closeSidebar } = sideBarSlice.actions

export const sideBarSliceReducer = sideBarSlice.reducer

