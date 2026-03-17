import userRepository from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.js';
import logger from '../../../common/logger/logger.js';
import {
  UserAlreadyExistsError,
  MissingNameError,
  MissingEmailError,
  InvalidEmailError,
  MissingPhoneNumberError,
  InvalidPhoneNumberError,
  MissingRoleError,
  InvalidRoleError,
  MissingUnitError,
} from '../errors.js';

const UAE_PHONE_RE = /^(?:\+971|971|0)?5\d{8}$/;
const VALID_ROLES = ['manager', 'engineer', 'foreman QC', 'foreman AC', 'foreman WL','admin'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const register = async (
  rNumber,
  password,
  unit,
  role,
  email,
  name,
  phoneNumber,
  correlationId
) => {
  logger.info('Registering user', { correlationId });

  if (!name || String(name).trim().length === 0) throw MissingNameError;
  if (!email || String(email).trim().length === 0) throw MissingEmailError;
  if (!EMAIL_RE.test(String(email).trim())) throw InvalidEmailError;
  if (!phoneNumber || String(phoneNumber).trim().length === 0) throw MissingPhoneNumberError;
  if (!UAE_PHONE_RE.test(String(phoneNumber).trim())) throw InvalidPhoneNumberError;
  if (!role || String(role).trim().length === 0) throw MissingRoleError;
  if (!VALID_ROLES.includes(String(role).trim())) throw InvalidRoleError;
  if (!Array.isArray(unit) || unit.length === 0) throw MissingUnitError;

  const exists = await userRepository.findByRNumber(rNumber);
  if (exists) throw UserAlreadyExistsError;

  const hashedPassword = await hashPassword(password);
  logger.info('hasheed password', { correlationId });

  try {
    const created = await userRepository.create({
      rNumber,
     hashedPassword,
      unit,
      role,
      email: String(email).trim().toLowerCase(),
      name: String(name).trim(),
      phoneNumber: String(phoneNumber).trim(),
    });

    logger.info('User created', { correlationId });
    return created;
  } catch (error) {
    logger.error('userRepository.create failed', {
      correlationId,
      error: error.message,
      stack: error.stack,
    });
    return;
  }
};