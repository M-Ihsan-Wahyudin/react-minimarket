import { Fragment, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import { storeUserData } from "../store/features/userData/userDataSlice"
import axios from "axios"

const Middleware = (props) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const userCheck = async () => {
    let token = localStorage.getItem('jwt');
    if(token) {
      await axios({
        method: 'GET',
        baseURL: 'https://backend-minimarket.herokuapp.com/api/usercheck',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
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
          props.children
        :
          ''
      }
    </Fragment>
  )
}

export default Middleware;