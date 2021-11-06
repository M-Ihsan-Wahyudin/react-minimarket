import React from "react"
import { Route, Switch } from "react-router-dom"
import Middleware from "./middleware"
import UnAuthorizationRoute from "./unAuthorizationRoute"

// Views
import Login from "../views/auth/login"
import Dashboard from "../views/dashboard/dashboard"
import PageNotFound from "../views/pageNotFound/pageNotFound"
import Pemasok from "../views/pemasok/pemasok"
import Barang from "../views/barang/barang"
import Pembelian from "../views/transaksi/pembelian"
import Kategori from "../views/kategori/kategori"
import Pelanggan from "../views/pelanggan/pelanggan"
import Karyawan from "../views/karyawan/karyawan"
import Penjualan from "../views/transaksi/penjualan/penjualan"
import ProtectedRoute from "./protectedRoute"
import LaporanPenjualan from "../views/laporan/penjualan/laporanPenjualan"
import LaporanPembelian from "../views/laporan/pembelian/laporanPembelian"
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