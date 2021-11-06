import axios from "axios";
import store from "../store";
import { addLaporan, addLaporanPembelian, addLaporanPenjualan } from "../store/features/laporan/laporanSlice";
import { addPelanggan } from "../store/features/pelanggan/pelangganSlice";
import { addPemasok } from "../store/features/pemasok/pemasokSlice";
import { addCategory, addProduct } from "../store/features/product/productSlice";

class client {
  token() {
    return localStorage.getItem('jwt');
  }

  clientRequest(method, baseURL, data) {
    return axios({ method, baseURL, data,
      headers: {
        'Authorization': `Bearer ${this.token()}`
      }
    })
  }

  getProduct() {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/product')
    .then(res => {
      store.dispatch(addProduct(res.data))
    })
  }

  getCategory() {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/category')
    .then(res => {
      store.dispatch(addCategory(res.data))
    })
  }

  getPelanggan() {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/customer')
    .then(res => {
      store.dispatch(addPelanggan(res.data))
    })
  }

  getPemasok() {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/supplier')
    .then(res => {
      store.dispatch(addPemasok(res.data))
    })
  }

  getAllReportPurchase()
  {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/report/purchase/all')
    .then(res => {
      store.dispatch(addLaporanPembelian(res.data))
    })
  }

  getAllReportSale()
  {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/report/sale/all')
    .then(res => {
      store.dispatch(addLaporanPenjualan(res.data))
    })
  }

  getReportAllInOne() {
    this.clientRequest('GET', 'https://backend-minimarket.herokuapp.com/api/report/allinone')
    .then(res => {
      store.dispatch(addLaporan(res.data))
    })
  }

  postCategory(data, callback) {
    const obj = {
      name: 'aku',
      identity: 'x00000'
    }
    if(data) {
      callback(true, obj)
    } else {
      callback(false, obj)
    }
  }

  postPenjualan(data, callback) {
    this.clientRequest('POST', 'https://backend-minimarket.herokuapp.com/api/transaction/sale', data)
    .then(res => {
      callback(true, res)
    })
    .catch(err => {
      callback(false, err)
    })
  }

  postPembelian(data, callback) {
    this.clientRequest('POST', 'https://backend-minimarket.herokuapp.com/api/transaction/purchase', data)
    .then(res => {
      callback(true, res)
    })
    .catch(err => {
      callback(false, err)
    })
  }
}

export default new client();