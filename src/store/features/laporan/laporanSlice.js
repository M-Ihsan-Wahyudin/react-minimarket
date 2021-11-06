import { createSlice } from "@reduxjs/toolkit";

export const laporanSlice = createSlice({
  name: 'laporan',
  initialState: {
    data: [],
    dataLaporanPembelian: {
      reportPurchase: [],
      countTransactionPurchase: 0,
    },
    dataLaporanPenjualan: {
      reportSale: [],
      countTransactionSale: 0,
    }
  },
  reducers: {
    addLaporan(state, action) {
      return {
        ...state,
        data: action.payload
      }
    },
    addLaporanPembelian(state, action) {
      return {
        ...state,
        dataLaporanPembelian: action.payload
      }
    },
    addLaporanPenjualan(state, action) {
      return {
        ...state,
        dataLaporanPenjualan: action.payload
      }
    }
  }
})

export const { addLaporan, addLaporanPembelian, addLaporanPenjualan } = laporanSlice.actions

export default laporanSlice.reducer