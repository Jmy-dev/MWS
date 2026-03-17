import User from '../models/user.model.js';
export const findByRole = async (role) => {
    return await User.find({role});
}