import patchRepository from '../repositories/patch.repository.js';
import logger from '../../../common/logger/logger.js';
import AppError from '../../../common/error/appError.js';
import {
  MissingPatchNoError,
  MissingWorkOrderError,
  MissingTotalWeightError,
  InvalidTotalWeightError,
  MissingTotalItemsError,
  InvalidTotalItemsError,
  MissingTotalAssemblyUnderWorkError,
  InvalidTotalAssemblyUnderWorkError,
  MissingTotalWeldingUnderWorkError,
  InvalidTotalWeldingUnderWorkError,
  MissingStatusError,
  InvalidStatusError,
  MissingCreatedByError,
  ExistingPatchNoError,
} from '../errors.js';

const VALID_STATUSES = ['pending', 'in_progress', 'completed', 'cancelled'];

export const createPatch = async (
  patch_no,
  work_order,
  total_weight,
  total_items,
  total_assembly_under_work,
  total_welding_under_work,
  status,
  createdBy,
  items = [],
  correlationId
) => {
  logger.info('Creating patch', { correlationId });

  if (!patch_no || String(patch_no).trim().length === 0) throw MissingPatchNoError;
  if (!work_order || String(work_order).trim().length === 0) throw MissingWorkOrderError;
  if (total_weight === undefined || total_weight === null || isNaN(total_weight) || total_weight < 0) throw total_weight < 0 ? InvalidTotalWeightError : MissingTotalWeightError;
  if (total_items === undefined || total_items === null || isNaN(total_items) || total_items < 0) throw total_items < 0 ? InvalidTotalItemsError : MissingTotalItemsError;
  if (total_assembly_under_work === undefined || total_assembly_under_work === null || isNaN(total_assembly_under_work) || total_assembly_under_work < 0) throw total_assembly_under_work < 0 ? InvalidTotalAssemblyUnderWorkError : MissingTotalAssemblyUnderWorkError;
  if (total_welding_under_work === undefined || total_welding_under_work === null || isNaN(total_welding_under_work) || total_welding_under_work < 0) throw total_welding_under_work < 0 ? InvalidTotalWeldingUnderWorkError : MissingTotalWeldingUnderWorkError;
  if (!status || String(status).trim().length === 0) throw MissingStatusError;
  if (!VALID_STATUSES.includes(String(status).trim())) throw InvalidStatusError;
  if (!createdBy) throw MissingCreatedByError;

  const existingPatch = await patchRepository.findByPatchNo(patch_no);
  if (existingPatch) throw ExistingPatchNoError;

  try {
    const created = await patchRepository.create({
      patch_no: String(patch_no).trim(),
      work_order: String(work_order).trim(),
      total_weight: Number(total_weight),
      total_items: Number(total_items),
      total_assembly_under_work: Number(total_assembly_under_work),
      total_welding_under_work: Number(total_welding_under_work),
      status: String(status).trim(),
      createdBy,
      items,
    });

    logger.info('Patch created', { correlationId });
    return created;
  } catch (error) {
    logger.error('patchRepository.create failed', {
      correlationId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export const getMyPatches = async (createdBy, correlationId) => {
  logger.info('Getting my patches', { correlationId });

  try {
    const patches = await patchRepository.findAllByCreatedBy(createdBy);
    logger.info('Patches retrieved', { correlationId });
    return patches;
  } catch (error) {
    logger.error('patchRepository.findAllByCreatedBy failed', {
      correlationId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};

export const getPatchById = async (id, correlationId) => {
  logger.info('Getting patch by id', { correlationId, id });

  try {
    const patch = await patchRepository.findById(id);
    if (!patch) {
      throw new AppError('Patch not found', 404);
    }
    logger.info('Patch retrieved', { correlationId, id });
    return patch;
  } catch (error) {
    logger.error('patchRepository.findById failed', {
      correlationId,
      error: error.message,
      stack: error.stack,
    });
    throw error;
  }
};