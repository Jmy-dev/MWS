import { register } from './register.js';
import { login } from './login.js';
import { refresh } from './refresh.js';
import { getMe } from './getMe.js';

const userServices = {
    register,
    login,
    refresh,
    getMe
}

export default userServices;