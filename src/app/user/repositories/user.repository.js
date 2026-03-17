import { findAll } from './findAll.js';
import { findById } from './findById.js';
import { findByRNumber } from './findByRNumber.js';
import { findByRole } from './findByRole.js';
import { create } from './create.js';
import { findByEmail } from './findByEmail.js';

const userRepository = {
    findAll,
    findById,
    findByRNumber,
    findByRole,
    create,
    findByEmail

} 

export default userRepository;