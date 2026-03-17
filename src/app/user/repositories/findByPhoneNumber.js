import User from '../models/user.model.js';

export const findByPhoneNumber = async (phoneNumber) => {
    return await User.findOne({phoneNumber});
}
