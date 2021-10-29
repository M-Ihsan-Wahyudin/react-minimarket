import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './features/counter/counterSlice'
import productSlice from './features/product/productSlice'
import locationSlice from './features/location/locationSlice'
import pemasokSlice from './features/pemasok/pemasokSlice'
import pelangganSlice from './features/pelanggan/pelangganSlice'
import karyawanSlice from './features/karyawan/karyawanSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    product: productSlice,
    location: locationSlice,
    pemasok: pemasokSlice,
    pelanggan: pelangganSlice,
    karyawan: karyawanSlice
  }
});