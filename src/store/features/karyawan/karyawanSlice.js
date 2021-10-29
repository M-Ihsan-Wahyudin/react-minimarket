import { createSlice } from "@reduxjs/toolkit";

const karyawanSlice = createSlice({
  name: 'staff',
  initialState: {
    data: []
  },
  reducers: {
    addKaryawan(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
})

export const { addKaryawan } = karyawanSlice.actions

export default karyawanSlice.reducer