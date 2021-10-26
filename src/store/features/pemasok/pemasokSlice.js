import { createSlice } from "@reduxjs/toolkit";

export const pemasokSlice = createSlice({
  name: 'pemasok',
  initialState: {
    data: []
  },
  reducers:{
    addData(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
})

export const { addData } = pemasokSlice.actions

export default pemasokSlice.reducer