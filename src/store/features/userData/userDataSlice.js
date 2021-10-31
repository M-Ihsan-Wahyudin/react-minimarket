import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: 'userData',
  initialState: {},
  reducers: {
    storeUserData(state, action) {
      return {
        data: action.payload
      }
    }
  }
})

export const { storeUserData } = userDataSlice.actions

export default userDataSlice.reducer