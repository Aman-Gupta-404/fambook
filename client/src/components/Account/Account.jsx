import React, { useEffect } from 'react'
import "./Account.css"
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser } from "../../redux/userSlice"
import { useState } from 'react';
import avatar from "../../image/avatar.jpg"
import { Link } from 'react-router-dom';
import axios from "axios"
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

function Account() {
    let userState = useSelector((state) => state.user);
    const [user, setUser] = useState(userState.user)
    const [actionError, setActionError] = useState(false)
    const [userLogoutSuccess, setUserLogoutSuccess] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        console.log("logging user: ", user)
    }, [])
    
    const deleteUserFunction = async (e) => {
        e.preventDefault();
        // Making the url request to delete user from state
        const apiURL = `/api/user/delete/${user._id}`
        const deleteRes = await axios.delete(apiURL, {_id: user._id});
        console.log(deleteRes);
    }

    const logOutUser = async (e) => {
        e.preventDefault();
        // clearing out the cache and cookies and the states
        const apiURL = `/api/user/logout/${user._id}`
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.accessToken}`,
            'Access-Control-Allow-Origin': '*',
        }

        console.log(user.accessToken)
        axios.post(apiURL, { testData: "data"}, {
            headers: headers,
            withCredentials: true
        }).then((result) => {
            if(result.data.error) {
                return setActionError(true);
            } else if(!result.data.error){
                console.log("User Logged out")
                setUserLogoutSuccess(true);    
                return dispatch(deleteUser());
            } 
        }).catch((err) => {
            console.log("axios error: ", err)
            return setActionError(true);
        })
        
    }

    const HandleLogoutCLose = (e) => {
        setUserLogoutSuccess(false);
    }

    const handleErrorClose = (e) => {
        setActionError(false);
    }

    const LogoutRender = () => {
        // dialoge for rendering error
        // if(userLogoutSuccess) {
            return (
                <Dialog
                    open={userLogoutSuccess}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={HandleLogoutCLose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent>
                    <p>Your Logout was successful!</p>
                    </DialogContent>
                    <DialogActions>
                        <Link to='/' className='dialogButtonLink'>
                            {/* <Button onClick={handle}>Agree</Button> */}
                            Close
                        </Link>
                    </DialogActions>
                </Dialog>
            )
        // }
    }

    const ErrorRender = () => {
        // dialoge for rendering logout 
        return (
            <Dialog
                open={actionError}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleErrorClose}
                aria-describedby="alert-dialog-slide-description"
            >
                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                <p>There was some error, please try again!</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleErrorClose} className='dialogButtonLink'>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

  return (
    <div className='account'>
        <div className="account__container">
            <div className="heading">
                <h2 className="heading__text">Account</h2>
            </div>
            <div className="account__image">
                <img src={avatar} className="account__image--img" alt="" />
            </div>
            <div className="account__details">
                <div className="account--section">
                    <div className="details_left">Name</div>
                    <div className="details_right">{user.firstName}</div>
                </div>
                <div className="account--section">
                    <div className="details_left">Email</div>
                    <div className="details_right">{user.email}</div>
                </div>
                <div className="account--section">
                    <div className="details_left">Gender</div>
                    <div className="details_right">{user.gender}</div>
                </div>
                <div className="account--action">
                    <Link to="/post" className="account_action_post">Post</Link>
                    <button onClick={deleteUserFunction} className="account_action_delete">Delete</button>
                </div>
                <div className="account--action">
                    {/* <Link to="/post" className="account_action_post">Post</Link> */}
                    <button onClick={logOutUser} className="account_action_logout">Logout</button>
                </div>
            </div>
        </div>
        {/* dialoges renders */}
        {ErrorRender()}
        {LogoutRender()}
    </div>
  )
}

export default Account