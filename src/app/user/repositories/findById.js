import User from '../models/user.model.js';
export const findById = async (id) => {
    return await User.findById(id);
}