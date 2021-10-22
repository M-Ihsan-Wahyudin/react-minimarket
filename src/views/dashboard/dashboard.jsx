import Header from "../../component/header/header"
import Sidebar from "../../component/sidebar/sidebar"
import Main from "./main"
import "./dashboard.css"

const Dashboard = () => {
  return (
    <div className="dashboard-wrapper">
      <Header/>
      <Sidebar/>
      <Main />
    </div>
  )
}

export default Dashboard;