import User from '../models/user.model.js';

export const findByRNumber = async (rNumber) => {
    return await User.findOne({rNumber});
}
