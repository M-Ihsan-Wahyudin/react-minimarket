import { Link, useRouteMatch } from "react-router-dom";
import AdminLayout from "../../layouts/Admin";

const Transaction = () => {
  const { url } = useRouteMatch();
  return (
    <AdminLayout>
      <main className="main-content main-bg">
        <Link to={`${url}/home`} >Ini Halaman Transaction</Link>
      </main>
    </AdminLayout>
  )
}

export default Transaction;