import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { storeUserData } from "../store/features/userData/userDataSlice";

export default function UnAuthorizationRoute({ component: Component, ...rest }) {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const dispatch = useDispatch();
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
      })
    } else {
      setAuthenticated(false)
    }
  }

  useEffect(() => {
    if(!isAuthenticated) {
      userCheck();
    }
  })
  return (
    <Route
      {...rest}
      render={ () => {
        if(!isAuthenticated) {
          return <Component/>
        } else {
          return <Redirect to={{ pathname: "/home", state: { from: rest.path } }} />
        }
      }}
    />
  )
}