import React, { useState } from 'react'
import "./AppBar.css"
import { useSelector, useDispatch } from "react-redux"
import memories from "../../image/memories.png"
import { Link } from "react-router-dom"
import { useEffect } from 'react';
import { isUserLoggedIn } from '../../helper/AuthHelper'

function AppBar({loginStatus}) {
  const [navOpen, setNavOpen] = useState(false)

  const renderLogin = () => {
    // if(!useSelector((state) => state.user.isLoggedIn)) {
    if(!loginStatus) {
      return (
        <Link  to='/register/login' className='appBar__option'>Login</Link>
      )
    } else return null;
  }
  
  const renderSignup = () => {
    if(!loginStatus) {
      return (
        <Link  to='/register/signup' className='appBar__option'>Signup</Link>
      )
    } else return null;
  }

  const renderAccount = () => {
    if(loginStatus) {
      return (
        <Link  to='/account' className='appBar__option'>Account</Link>
      )
    } else return null
  }

  const renderMyPost = () => {
    if(loginStatus) {
      return (
        <Link  to='/mypost' className='appBar__option'>My Posts</Link>
      )
    } else return null
  }

  const openMobileOptions = (e) => {
    e.preventDefault();
    setNavOpen(!navOpen);
  }

  return (
    <div className="appBar" >
        <div className="appBar__left">
          <img className="appBar__image" src={memories} alt="memories" height="60" />
          <h1 className="appBar__heading">Fambook</h1>
        </div>
        <div className="appBar__right" id={navOpen ? "openNavbar" : ""}>
          <Link to='/' className='appBar__option'>Feed</Link>
          <Link to='post' className='appBar__option'>Post</Link>
          {renderLogin()}
          {renderSignup()}
          {renderMyPost()}
          {renderAccount()}
        </div>
        <div className="burger" onClick={openMobileOptions}>
          <div className="burgerline"></div>
          <div className="burgerline"></div>
          <div className="burgerline"></div>
        </div>
        
      </div>
  )
}

export default AppBar