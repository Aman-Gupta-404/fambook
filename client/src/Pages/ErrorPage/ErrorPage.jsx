import React from 'react'
import "./ErrorPage.css"
import { Link } from "react-router-dom"

function ErrorPage() {
  return (
    <div className='errorMessage'>
      <h1>Ops!</h1>
      <p className="errorpage_text">The page you are looking for does not exists, pleases trying logging into your account and then check.</p>
      <Link to='register/login' className='error_page_button'>Login</Link>
    </div>
  )
}

export default ErrorPage