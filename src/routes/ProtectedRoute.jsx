import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
// import { Fragment } from "react";



export default function ProtectedRoute({ component: Component, ...rest }) {
  const userData = useSelector(state => state.userData.data);
  return (
    <Route
      {...rest}
      render={ () => {
        console.info(rest)
        if(userData.level === rest.level) {
          return <Component/>
        } else {
          return <Redirect to={{ pathname: "/dashboard", state: { from: rest.path } }} />
        }
      }}
    />
  )
}
// import React from "react";
// import { useHistory } from "react-router-dom";
// import { Fragment } from "react";
// import { useSelector } from "react-redux";


// function ProtectedRoute(props) {
//   const userData = useSelector(state => state.userData.data);
//   const history = useHistory();
//   return (
//     <Fragment>
//       {
//           userData.level === props.level ?
//             props.children
//           :
//             history.push('/')
//       }
//     </Fragment>
//   )
// }

// export default ProtectedRoute;
