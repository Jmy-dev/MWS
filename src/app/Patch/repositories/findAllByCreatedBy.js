import Patch from '../model/patch.model.js';

export const findAllByCreatedBy = async (createdBy) => {
  return await Patch.find({ createdBy });
};

export const findById = async (id) => {
  return await Patch.findById(id);
};