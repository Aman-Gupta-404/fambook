import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from './redux/userSlice'
import { getPost } from './redux/postSlice'
import { Container, Typography, Grid, Grow } from '@mui/material'
import axios from 'axios'
import memories from "./image/memories.png"
import Form from "./components/Forms/Forms"
import Posts from "./components/Posts/Posts"
import AppBar from "./components/appbar/AppBar"
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Register from './components/Register/Register'
import Home from './Pages/Home'
import PostPage from './Pages/PostPage/PostPage'
import Account from './components/Account/Account'
import SecuredRoute from './SecuredRoute'
import ErrorPage from './Pages/ErrorPage/ErrorPage'
import MyPost from './Pages/MyPost/MyPost'


function App() {
  let userLoginStatus = useSelector((state) => state.user.isLoggedIn);
  const [loginFlag, setLoginFlag] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {  
    setLoginFlag(userLoginStatus);
    refreshTokens()
  }, [loginFlag, userLoginStatus])
  
  const refreshTokens = async () => {
    console.log(loginFlag)
    // if(loginFlag) {
      const uri = `/api/auth/gettoken`
      const resData = await axios.get(uri, {
        withCredentials: true
      })
      if(!resData.data.error) {
        // refresh user
        dispatch(getUser({user: resData.data.user}));
      } else {
        // log the user out
      }
      console.log(resData)
    
  }

  return (
    <Router>
      <div className='app__container'>
        <AppBar loginStatus={loginFlag}/>
        <Routes>
          <Route exact path="/register/:loginStat" element={<Register isLogin={loginFlag} />}/>
          <Route exact path="/" element={<Home/>}/>
          {loginFlag? 
            <Route exact path="/account" element={<Account/>}/>:
            null
          }
          {loginFlag? 
            <Route exact path="/mypost" element={<MyPost/>}/>:
            null
          }
          {loginFlag? 
            <Route exact path="/post" element={<PostPage/>}/>:
            null
          }
          <Route exact path="*" element={<ErrorPage/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;