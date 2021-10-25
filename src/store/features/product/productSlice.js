import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addNewProduct(state, action) {
      return {
        ...state,
        data: action.payload
      }
    }
  }
});

export const { addNewProduct } = productSlice.actions

export default productSlice.reducer