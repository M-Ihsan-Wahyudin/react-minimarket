import { createSlice } from "@reduxjs/toolkit";

export const pemasokSlice = createSlice({
  name: 'pemasok',
  initialState: {
    data: []
  },
  reducers:{
    addPemasok(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
})

export const { addPemasok } = pemasokSlice.actions

export default pemasokSlice.reducer