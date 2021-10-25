import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      console.info(action);
      state.value += action.payload
    }
  }
});

// Destructuring Object from counterSlide
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer