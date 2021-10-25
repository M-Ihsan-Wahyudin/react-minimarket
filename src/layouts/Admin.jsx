import { Fragment } from "react"

// Component
import Header from "../component/header/header"
import Sidebar from "../component/sidebar/sidebar"

const Admin = (props) => {
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

export default Admin;