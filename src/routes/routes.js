import React from "react"
import { Route, Switch } from "react-router-dom"

// Component
import AdminLayout from "../layouts/Admin"

// Views
import Login from "../views/auth/login"
import Dashboard from "../views/dashboard/dashboard"
import PageNotFound from "../views/PageNotFound/PageNotFound"
import Pemasok from "../views/pemasok/Pemasok"
import Barang from "../views/barang/Barang"
import Pembelian from "../views/transaksi/Pembelian"
import Kategori from "../views/kategori/Kategori"
import Pelanggan from "../views/pelanggan/Pelanggan"
import Karyawan from "../views/karyawan/Karyawan"
import Penjualan from "../views/transaksi/Penjualan/Penjualan"
import ProtectedRoute from "./ProtectedRoute"
import LaporanPenjualan from "../views/laporan/Penjualan"

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <AdminLayout>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/barang" component={Barang} />
        <Route exact path="/kategori" component={Kategori} />
        <Route exact path="/pembelian" component={Pembelian} />
        <Route exact path="/penjualan" component={Penjualan} />
        <Route exact path="/pelanggan" component={Pelanggan} />
        <Route exact path="/karyawan" component={Karyawan} />
        <ProtectedRoute exact path="/pemasok" component={Pemasok} level="Operator" />
        <Route exact path="/laporan/penjualan" component={LaporanPenjualan} />
      </AdminLayout>
      <Route path="/*" component={PageNotFound} />
    </Switch>
  )
}
