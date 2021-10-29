import { createSlice } from "@reduxjs/toolkit";

const pelangganSlice = createSlice({
  name: 'pelanggan',
  initialState: {
    data: []
  },
  reducers: {
    addPelanggan(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
})

export const { addPelanggan } = pelangganSlice.actions

export default pelangganSlice.reducer