import React from "react"
import { Route, Switch } from "react-router-dom"

// Component
import AdminLayout from "../layouts/Admin"

// Views
import Login from "../views/auth/login"
import Dashboard from "../views/dashboard/dashboard"
import PageNotFound from "../views/PageNotFound/PageNotFound"
import ProductList from "../views/product/ProductList"
import NewProduct from "../views/product/NewProduct"
import Pemasok from "../views/pemasok/Pemasok"
import Barang from "../views/barang/Barang"
import Pembelian from "../views/transaksi/Pembelian"
import Kategori from "../views/kategori/Kategori"
import Pelanggan from "../views/pelanggan/Pelanggan"
import Karyawan from "../views/karyawan/Karyawan"
import Penjualan from "../views/transaksi/Penjualan/Penjualan"

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard">
        <AdminLayout>
          <Route path="/dashboard" component={Dashboard} />
        </AdminLayout>
      </Route>
      <Route path="/product">
        <AdminLayout>
          <Route exact path="/product/list" component={ProductList} />
          <Route exact path="/product/new" component={NewProduct} />
        </AdminLayout>
      </Route>
      <Route path="/pemasok" >
        <AdminLayout>
          <Route path="/pemasok" component={Pemasok}/>
        </AdminLayout>
      </Route>
      <Route path="/barang" component={Barang} />
      <Route path="/kategori" component={Kategori} />
      <Route path="/pembelian" component={Pembelian} />
      <Route path="/penjualan" component={Penjualan} />
      <Route path="/pelanggan" component={Pelanggan} />
      <Route path="/karyawan" component={Karyawan} />
      <Route component={PageNotFound} />
    </Switch>
  )
}
