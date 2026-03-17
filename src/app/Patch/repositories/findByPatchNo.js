import Patch from '../model/patch.model.js';

export const findByPatchNo = async (patch_no) => {
  return await Patch.findOne({ patch_no });
};