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

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/dashboard">
        <AdminLayout>
          <Route exact path="/dashboard" component={Dashboard} />
        </AdminLayout>
      </Route>
      <Route path="/product">
        <AdminLayout>
          <Route path="/product/list" component={ProductList} />
          <Route path="/product/new" component={NewProduct} />
        </AdminLayout>
      </Route>
      <AdminLayout>
        <Route path="/pemasok" component={Pemasok} />
      </AdminLayout>
      <Route path="/*" component={PageNotFound} />
    </Switch>
  )
}
