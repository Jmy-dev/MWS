import userServices from "../services/user.services.js";


 const register = async(req, res, next) => {
    try {
        const user = await userServices.register(req.body.rNumber, req.body.password, req.body.unit, req.body.role, req.body.email, req.body.name, req.body.phoneNumber);
        res.status(201).json( {user});
    }
    catch (error) {
        next(error);
    }
}

 const login = async(req, res,next) => {
    try {
        const {accessToken, refreshToken} = await userServices.login(req.body.rNumber, req.body.password);
        res.status(200).json({accessToken, refreshToken});
    }
    catch (error) {
        next(error);
    }
}

 const getMe = async(req, res,next) => {
    try {
        const token = req.headers['authorization']?.split(' ')[1];
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const user = await userServices.getMe(token);
        res.json({user});
    }
    catch (error) {
        next(error);
    }
}

 const refresh = async(req, res,next) => {
    try {
        const token = req.body.token;
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'});
        }
        const {newAccessToken} = userServices.refresh(token);
        res.json({newAccessToken});
    }
    catch (error) {
        next(error);
    }
}

const userController = {
    register,
    login,
    getMe,
    refresh
}

export default userController;