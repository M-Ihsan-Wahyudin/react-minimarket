// Dependencies
import React, { Fragment } from "react"
import { BrowserRouter as Router } from "react-router-dom"

// Route
import Routes from "../routes/routes"


const MainPage = () => {
  return (
    <Fragment>
      <Router>
        <Routes />
      </Router>
    </Fragment> 
  )
}

export default MainPage