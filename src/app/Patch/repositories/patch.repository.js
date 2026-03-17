import { create } from './create.js';
import { findByPatchNo } from './findByPatchNo.js';
import { findAllByCreatedBy } from './findAllByCreatedBy.js';
import { findById } from './findById.js';

const patchRepository = {
  create,
  findByPatchNo,
  findAllByCreatedBy,
  findById,
};

export default patchRepository;