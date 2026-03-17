import Patch from '../model/patch.model.js';

export const findById = async (id) => {
  return await Patch.findById(id);
};