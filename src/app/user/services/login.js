 import userRepository from "../repositories/user.repository.js";
 import { IncorrectCredentials } from "../errors.js";
 import { createAccessToken, createRefreshToken } from "../utils/jwt.js";
 import { comparePassword } from "../utils/hash.js";
 import logger from "../../../common/logger/logger.js";


export const login =  async (rNumber, password, correlationId) => {   
    logger.info("Logging in", {correlationId});
    const user = await userRepository.findByRNumber(rNumber);
    if (!user) throw IncorrectCredentials;

    logger.info("User found", { correlationId});

    const isCorrectPassword = await comparePassword(password, user.hashedPassword);
    if (!isCorrectPassword) throw IncorrectCredentials

    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    return {accessToken, refreshToken};
}