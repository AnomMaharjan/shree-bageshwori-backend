import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
    try {
        const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
     
        const doc = await UserToken.findOne({ token: refreshToken }).exec();

        if (!doc) {
        
            throw { error: true, message: "Invalid Refresh Token" };
        }

        const tokenDetails = jwt.verify(refreshToken, privateKey);
      

        return {
            tokenDetails,
            error: false,
            message: "Valid refresh token",
        };
    } catch (error) {
       
        throw { error: true, message: "Invalid Refresh Token" };
    }
};

export default verifyRefreshToken;


