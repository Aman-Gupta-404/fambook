import FamUser from "../models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { createTokens } from "../utils/tokens.js";

export const createUser = async (req, res) => {
    const userData = req.body;
    const newUser = await new FamUser(userData);

    try {
        const result = await newUser.save();
        res.status(201).json(result)
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const userLogin = async (req, res) => {
    const userLoginData = req.body;

    try {
        FamUser.findOne({ email: userLoginData.email }, async function (err, user) {
            console.log(user);
            if (user) {
                const correctPass = await bcrypt.compare(userLoginData.password, user.password);
                console.log(correctPass)
                const userDataSend = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    age: user.age,
                    gender: user.gender,
                    createdAt: user.createdAt
                }
                if (correctPass) {


                    // create access token
                    const tokens = createTokens(user)

                    // res.cookie("accessToken", tokens.accessToken, {maxAge : 60 * 60000, httpOnly: true});
                    res.cookie("refjid", tokens.refreshToken,
                        { httpOnly: true }
                    );

                    // userDataSend.refreshToken = tokens.refreshToken
                    userDataSend.accessToken = tokens.accessToken

                    // return new user
                    res.status(200).json({
                        loginSuccess: true,
                        error: false,
                        user: userDataSend
                    })

                } else {
                    res.status(423).json({
                        loginSuccess: false,
                        error: true,
                        message: "wrong password"
                    })
                }
            } else {
                res.status(404).json({
                    loginSuccess: false,
                    message: "Email not found",
                    error: true
                })
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const deleteUser = async (req, res) => {
    // We get user ID from the req body
    const userId = req.body._id;
    FamUser.findByIdAndDelete(userId, function(err, doc) {
        if(err) {
            return res.status(201).json({
                error: true,
                message: "user not deleted!"
            })
        } else {
            return res.status(200).json({
                error: false,
                message: "User has been deleted successfully!"
            })
        }
    })
}

export const logoutUser = (req, res) => {
    // clear cookies
    res.clearCookie('refjid');
    console.log("cookie is cleared")
    return res.status(200).json({
        errro: false,
        message: "User successfully loggedout"
    })
}
