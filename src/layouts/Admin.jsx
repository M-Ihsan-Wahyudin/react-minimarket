import { Fragment } from "react"

// Component
import Header from "../component/header/header"
import Sidebar from "../component/sidebar/sidebar"

const AdminLayout = (props) => {
  return (
    <Fragment>
      <div className="dashboard-wrapper">
        <Header/>
        <Sidebar/>
        {props.children}
      </div>
    </Fragment>
  )
}

export default AdminLayout;