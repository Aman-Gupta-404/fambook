import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function SecuredRoute({ children }) {
  let userLoginStatus = useSelector((state) => state.user.isLoggedIn);
  const [loginFlag, setLoginFlag] = useState(false)
  useEffect(() => {
    // let temp = useSelector((state) => state.user.isLoggedIn);
    setLoginFlag(userLoginStatus)
  }, [loginFlag, userLoginStatus])
  
  const renderRoute = () => {
    if(loginFlag) {
      return children
    } else return null
  }

  return (
    <>
        {renderRoute()}
    </>
  )
}

export default SecuredRoute