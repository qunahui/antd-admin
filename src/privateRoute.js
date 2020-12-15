import React, { Component,useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function PrivateRoute({ component: Component, push, auth, app, checkUserSessionStart, signInSendoStart,...rest }) {
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    // checkUserSessionStart()
  },[])

  useEffect(() =>{
  //   if(auth.error) {
  //     setOpen(true)
  //   }
  }
  ,[])


  return <>
    <Route
      {...rest}
      render={(props) =>
        true ? (
          <Component {...props} />
        ) : (
          <></>
        )
      }
    />
  </>
  
}

export default connect(state => ({
}), dispatch => ({ 
}))(PrivateRoute)
