import AppError from "../../common/error/appError.js";

export const IncorrectCredentials = new AppError('Invalid Credentials', 401);

export const MissingNameError = new AppError('Name is required', 400);
export const MissingEmailError = new AppError('Email is required', 400);
export const InvalidEmailError = new AppError('Email is not valid', 400);
export const MissingPhoneNumberError = new AppError('Phone number is required', 400);
export const InvalidPhoneNumberError = new AppError('Phone number is not valid (must be UAE format)', 400);
export const MissingRoleError = new AppError('Role is required', 400);
export const InvalidRoleError = new AppError('Role is not valid', 400);
export const MissingUnitError = new AppError('Unit is required', 400);
export const existingRNumberError = new AppError('RNumber already exists', 400);
export const existingEmailError = new AppError('Email already exists', 400);
export const existingPhoneNumberError = new AppError('Phone number already exists', 400);