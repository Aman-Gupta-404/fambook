import { verifyAccessToken, verifyRefreshToken, createTokens } from "../utils/tokens.js";
import FamUser from "../models/user.js";

export const checkUserLoggedIn = async (req, res, next) => {
    // const loginData = req.body;
    console.log("reached the route: ", req.headers);
    console.log("reached the route: ", req.headers.Authorization);
    const resToken = req.headers.authorization;
    if(!resToken) {
        return res.status(402).json({
            error: true,
            message: "User not logged in!"
        })
    }
    const token = resToken.split(" ")[1];
    const accessTokenVerificationResult = await verifyAccessToken(token)

    req.auth = {_id: accessTokenVerificationResult.user_id};
    next()
}

export const authenticateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        console.log("Reached authentication function")
        console.log("the param is",req.params.userId)
        const flag = req.auth && userId === req.auth._id;
        // console.log(req.body, req.auth, req.body._id, req.auth._id)
        console.log(flag)
        if(!flag) {
            return res.status(401).json({
                error: true,
                message: "User not authorized to access the content"
            })
        } else {
            return next();
        }
        
    } catch (error) {
        console.log(error)
        res.status(401).send("Internal server error!")   
    }
}

export const authenticateRefreshTOken = async (req, res) => {
    const R_token = req.cookies.refjid;
    // console.log("token is ", req.cookies)
    let flag = await verifyRefreshToken(R_token);
    console.log("flag is: ", flag);
    FamUser.findById(flag.user_id, function(err, user) {
        if(err) {
            return res.status(402).json({
                error: true,
                message: "user does not exist!"
            })
        } else if(user) {
            const userDataSend = {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                age: user.age,
                gender: user.gender,
                createdAt: user.createdAt
            }
            const tokens = createTokens(user);
            
            // res.cookie("refjid", tokens.refreshToken, {httpOnly: true});

            userDataSend.accessToken = tokens.accessToken

            return res.status(200).json({
                error: false,
                user: userDataSend
            })

        }   
    })
    // res.send(flag)
}