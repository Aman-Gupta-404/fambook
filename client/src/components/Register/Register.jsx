import React, { useState, useEffect } from 'react'
import "./Register.css"
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from "../../redux/userSlice"
import { redirect, Link, useNavigate, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function Register({ isLogin }) {
    const [loginState, setLoginState] = useState(true);
    // const [loading, setLoading] = useState(true);
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);
    const [signupDialogOpen, setSignupDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    })
    const [signUpData, setSignUpData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        gender: "",
        age: "",
        password: ""
    })
    let { loginStat } = useParams();

    let navigate = useNavigate();
    const dispatch = useDispatch()

    // console.log('current Pathname 👉️', window.location.pathname);

    useEffect(() => {  
        // checking if user is already loggedin  
        console.log("use effect fired: ", isLogin)
        if(isLogin) {
            console.log("redirecting user")
            return navigate("/");
        }
        if(loginStat === "login") {
            setLoginState(true);
        }else if(loginStat === "signup") {
            setLoginState(false);
        } else {
            setLoginState(true);
        }
    }, [isLogin])

    const handleClickOpen = () => {
        setLoginDialogOpen(true);
    };
    
      const handleClose = () => {
        setLoginDialogOpen(false);
        console.log("Trying to navigate!");
        // return redirect("/post")
        return navigate("/");
    };

    const handleSignupDialog = () => {
        setLoginState(true);
        setSignupDialogOpen(false);
    }

    const onLoginInutChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    }

    const onSignupInutChange = (e) => {
        setSignUpData({
            ...signUpData,
            [e.target.name]: e.target.value
        });
    }

    const changeRegisterState = (e) => {
        if(e.target.name === "login") {
            setErrorMessage("");
            setLoginState(true);
        } else if(e.target.name === "signup") {
            setErrorMessage("");
            setLoginState(false);
        }
     }


     const loginSubmit = async (e) => {
        e.preventDefault();
        const flag = loginData.email === "" || loginData.password === "";
        console.log(flag)
        console.log(loginData.email, loginData.password)
        if(!flag) {
            // setLoginData(true)
            const user = loginData;
            axios.post(`/api/user/signin`, user, {withCredentials: true}).then(res => {
                // store the user in redux
                // check error response from server
                console.log(res.data.loginSuccess && !res.data.error)
                if(res.data.loginSuccess) {
                    dispatch(getUser({user: res.data.user}));
                    // setLoading(false);
                    console.log("login success")
                    setLoginData({
                        email: "",
                        password: ""
                    })
                    setLoginDialogOpen(true);
                } else {
                    return setErrorMessage(res.message);
                }
                
            }).catch(err => {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                return setErrorMessage("Some error occured, please try again");
            })
        } else {
            return setErrorMessage("please fill all the fields!");
        }
     }

     const signupSubmit = async (e) => {
        e.preventDefault();
        // form validation
        const flag = signUpData.firstName !== "" || signUpData.lastName !== "" || signUpData.email !== "" || signUpData.age !== "" || signUpData.gender !== "" || signUpData.password !== "";
        if(!flag) {
            const userData = signUpData;
            axios.post(`/api/user/create`, userData).then(res => {
                console.log(res.data)
            }).catch(err => {
                console.log(err)
            })
        } else {
            return setErrorMessage("please fill all the fields!");
        }
     }

    const login = () => {
        return (
            <div className='register__login'>
                <div className="register__form--input--cont">
                    <h4 className="text5">Email</h4>
                    <input onChange={onLoginInutChange} type="text" value={loginData.email} name="email" className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Password</h4>
                    <input onChange={onLoginInutChange} type="password" value={loginData.password} name="password" className='register__form--input'/>
                </div>
                {errorMessage !== "" ?
                    <div className="register__form--input--cont">
                        <p className="error_text">{errorMessage}</p>
                    </div>:
                    ""
                }
                <button
                    onClick={loginSubmit}
                    className="register__submit__button"
                >
                    Login
                </button>
            </div>
        )
    }

    const signup = () => {
        return (
            <div className='register__login'>
                <div className="register__form--input--cont">
                    <h4 className="text5">First Name</h4>
                    <input onChange={onSignupInutChange} type="text" name="firstName" value={signUpData.firstName} className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Last Name</h4>
                    <input onChange={onSignupInutChange} type="text" name="lastName" value={signUpData.lastName} className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Email</h4>
                    <input onChange={onSignupInutChange} type="email" name="email" value={signUpData.email} className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Age</h4>
                    <input onChange={onSignupInutChange} type="text" name="age" value={signUpData.age} className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Gender</h4>
                    <input onChange={onSignupInutChange} type="text" name="gender" value={signUpData.gender} className='register__form--input'/>
                </div>
                <div className="register__form--input--cont">
                    <h4 className="text5">Password</h4>
                    <input onChange={onSignupInutChange} type="password" name="password" value={signUpData.password} className='register__form--input'/>
                </div>
                {errorMessage !== "" ?
                    <div className="register__form--input--cont">
                        <p className="error_text">{errorMessage}</p>
                    </div>:
                    ""
                }
                <button onClick={signupSubmit} className="register__submit__button">Signup</button>
            </div>
        )
    }
 
    const loginDialog = () => {
        return (
            <Dialog
                open={loginDialogOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <p>You have successfully loggedin</p>
                </DialogContent>
                <DialogActions>
                    {/* <Link to='/' className='dialogButtonLink'> */}
                        <Button onClick={handleClose}>Close</Button>
                        {/* Agree */}
                    {/* </Link> */}
                </DialogActions>
            </Dialog>
        )
    }

    const signupDialog = () => {
        return (
            <Dialog
                open={signupDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleSignupDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <p>You have successfully signed up, now please login with this account</p>
                </DialogContent>
                <DialogActions>
                    <Link to='/' className='dialogButtonLink'>
                        {/* <Button onClick={handle}>Agree</Button> */}
                        Agree
                    </Link>
                </DialogActions>
            </Dialog>
        )
    }

  return (
    <div className='register'>
        <div className="register__box">
            <div className="register__box--heading">
                <h1 className="text3 register__head__text">{loginState ? "Login" : "Signup"}</h1>
            </div>
            <div className="register__box--body">
                <div className="register__box--body--opt">
                    <button name='login' className="register--signin" onClick={changeRegisterState} id={`${loginState ? "active_register" : ""}`}>
                        Login
                    </button>
                    <button name='signup' className="register--signup" onClick={changeRegisterState} id={`${loginState ? "" : "active_register"}`}>
                        Sign Up
                    </button>
                </div>
                <div className="register__box--body--form">
                    {loginState ? login() : signup() }
                </div>
            </div>
        </div>
        {loginDialog()}
    </div>
  )
}

export default Register