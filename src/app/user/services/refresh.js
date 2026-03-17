import { verifyRefreshToken , createAccessToken } from "../utils/jwt.js";

export const refresh = (refreshToken) => {
    const user = verifyRefreshToken(refreshToken);
    const newAccessToken = createAccessToken(user);
    return {newAccessToken};
}