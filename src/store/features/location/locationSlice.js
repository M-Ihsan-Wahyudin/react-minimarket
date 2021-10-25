import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    pathname: '',
  },
  reducers: {
    changePathname(state, action) {
      state.pathname = action.payload
    }
  }
});

export const { changePathname } = locationSlice.actions

export default locationSlice.reducer