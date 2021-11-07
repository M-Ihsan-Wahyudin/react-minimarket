import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  dataCategory: [],
  dataBarangKadaluarsa: []
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
    },
    addBarangKadaluarsa(state, action) {
      return {
        ...state,
        dataBarangKadaluarsa: action.payload
      }
    }
  }
});

export const { addProduct, addCategory, addBarangKadaluarsa } = productSlice.actions

export default productSlice.reducer