import { verifyAccessToken } from "../utils/jwt.js"
import User from "../models/user.model.js";
export const getMe = async (accessToken) => { 
    const {email} = await verifyAccessToken(accessToken);
    console.log(email);
    const user = await User.findOne({ email: email });
    return user;
}