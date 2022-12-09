import jwt, { decode } from "jsonwebtoken"
import Token from "../models/userTokens.js"

export const createTokens = (user) => {
    // create access token
    const accessToken = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.ACCESSTOKENKEY,
        // "Access_Token",
        {
            expiresIn: "1d",
        }
    );
    // creating refresh token
    const refreshToken = jwt.sign(
        { user_id: user._id, email: user.email },
        process.env.REFRESHTOKENKEY,
        // "Refresh_Token",
        {
            expiresIn: "7d",
        }
    );

    // storing the token in database
    Token.findOne({ userId: user._id }, async function (err, token) {
        if(token) {
            await token.remove();
        } else if(!token) {
            const newToken = await Token({userId: user._id, token: refreshToken})
            const result = await newToken.save()
        }
    })

    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

export const verifyAccessToken = async (token) => {
    // const token =
    //   req.body.token || req.query.token || req.headers["x-access-token"];
    //   checking if the token exists
    if (!token) {
      return res.status(403).json({
        message: "A token is required for authentication"
      });
    }
    try {
      const decoded = jwt.verify(token, process.env.ACCESSTOKENKEY);
      return decoded
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
}

export const verifyRefreshToken = async (token) => {
    let respondData;
    if (!token) {
      return {
        verified: false
      }
    }
    try {
      // console.log("trying to check token: ", token)
      await jwt.verify(token, process.env.REFRESHTOKENKEY, (err, verifiedTkn) => {
        if(!err) {
          console.log("the verified res: ", verifiedTkn.user_id);
          respondData = verifiedTkn;
        } else {
          console.log(err)
        }
      });
    } catch (err) {
      return false;
    }
    console.log("reached here")
    return respondData
}