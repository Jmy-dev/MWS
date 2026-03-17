import AppError from "../../common/error/appError.js";

export const MissingPatchNoError = new AppError('Patch number is required', 400);
export const MissingWorkOrderError = new AppError('Work order is required', 400);
export const MissingTotalWeightError = new AppError('Total weight is required', 400);
export const InvalidTotalWeightError = new AppError('Total weight must be a positive number', 400);
export const MissingTotalItemsError = new AppError('Total items is required', 400);
export const InvalidTotalItemsError = new AppError('Total items must be a non-negative number', 400);
export const MissingTotalAssemblyUnderWorkError = new AppError('Total assembly under work is required', 400);
export const InvalidTotalAssemblyUnderWorkError = new AppError('Total assembly under work must be a non-negative number', 400);
export const MissingTotalWeldingUnderWorkError = new AppError('Total welding under work is required', 400);
export const InvalidTotalWeldingUnderWorkError = new AppError('Total welding under work must be a non-negative number', 400);
export const MissingStatusError = new AppError('Status is required', 400);
export const InvalidStatusError = new AppError('Status must be one of: pending, in_progress, completed, cancelled', 400);
export const MissingCreatedByError = new AppError('Created by is required', 400);
export const ExistingPatchNoError = new AppError('Patch number already exists', 400);