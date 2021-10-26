import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  dataCategory: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct(state, action) {
      return {
        ...state,
        data: action.payload
      }
    },
    addCategory(state, action) {
      return {
        ...state,
        dataCategory: action.payload
      }
    }
  }
});

export const { addProduct, addCategory } = productSlice.actions

export default productSlice.reducer