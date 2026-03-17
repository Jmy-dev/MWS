import User from '../models/user.model.js';
export const findAll = async () => {
    return await User.find();
}
