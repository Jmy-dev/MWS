import jwt from 'jsonwebtoken';
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export const createAccessToken = (user) => {
    return jwt.sign({email: user.email}, ACCESS_SECRET, {expiresIn: '1h'})
}

export const createRefreshToken = (user) => {
    return jwt.sign({email: user.email}, REFRESH_SECRET, {expiresIn: '12h'})
}

export const verifyRefreshToken = (token) => {
    return jwt.verify(token, REFRESH_SECRET);
}

export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET);
}