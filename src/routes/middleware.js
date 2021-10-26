import { Route, Redirect } from "react-router-dom"
import axios from "axios"

export default function ProtectedRoute({ children, ...rest }) {
  // let auth = useAuth();


  const checkAuthenticate = () => {
    let token = localStorage.getItem("jwt")
    axios({
      method: 'GET',
      baseURL: 'http://127.0.0.1:8000/api/usercheck',
      headers: {
        'Authorization': token
      }
    })
    .then(res => {
      console.info(res)
    })
    .catch(err => {
      console.info(err)
    })
    return false;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        checkAuthenticate ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}