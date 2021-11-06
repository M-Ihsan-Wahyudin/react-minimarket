import React from "react"
import { Route, Switch } from "react-router-dom"
import Middleware from "./Middleware"
import UnAuthorizationRoute from "./UnAuthorizationRoute"

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
import LaporanPenjualan from "../views/laporan/Penjualan/LaporanPenjualan"
import LaporanPembelian from "../views/laporan/Pembelian/LaporanPembelian"
import Home from "../views/dashboard/home"

export default function Routes() {
  return (
    <Switch>
      <UnAuthorizationRoute exact path="/" component={Login} />
      <Middleware>
        <Switch>
          <Route exact path="/home" component={Home} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} level="Administrator" />
          <ProtectedRoute exact path="/pembelian" component={Pembelian} level="Operator" />
          <ProtectedRoute exact path="/penjualan" component={Penjualan} level="Operator" />
          <ProtectedRoute exact path="/barang" component={Barang} level="Entry Data Processing" />
          <ProtectedRoute exact path="/kategori" component={Kategori} level="Entry Data Processing" />
          <ProtectedRoute exact path="/pelanggan" component={Pelanggan} level="Entry Data Processing" />
          <ProtectedRoute exact path="/pemasok" component={Pemasok} level="Entry Data Processing" />
          <ProtectedRoute exact path="/karyawan" component={Karyawan} level="Administrator" />
          <ProtectedRoute exact path="/laporan/penjualan" component={LaporanPenjualan} level="Administrator" />
          <ProtectedRoute exact path="/laporan/pembelian" component={LaporanPembelian} level="Administrator" />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </Middleware>
      <Route path="/*" component={PageNotFound} />
    </Switch>
  )
}