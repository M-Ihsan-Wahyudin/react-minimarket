import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import axios from "axios"
import { useDispatch } from "react-redux"

// Component
import Header from "../component/header/header"
import Sidebar from "../component/sidebar/sidebar"
import { storeUserData } from "../store/features/userData/userDataSlice"
// import Auth from "../routes/Auth"

const AdminLayout = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userCheck = async () => {
    let token = localStorage.getItem('jwt');
    if(token) {
      await axios({
        method: 'GET',
        baseURL: 'http://127.0.0.1:8000/api/usercheck',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        console.info(res)
        dispatch(storeUserData(res.data.user))
        setAuthenticated(true)
      })
      .catch(err => {
        console.info(err.response)
        setAuthenticated(false)
        history.push('/')
      })
    } else {
      setAuthenticated(false)
      history.push('/')
    }
  }

  useEffect(() => {
    if(!isAuthenticated) {
      userCheck();
    }
  })

  return (
    <Fragment>
      {
        isAuthenticated ?
        <div className="dashboard-wrapper">
          <Header/>
          <Sidebar/>
          {props.children}
        </div>
        :
        <div></div>
      }
    </Fragment>
  )
}

export default AdminLayout;