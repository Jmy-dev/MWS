import Patch from '../model/patch.model.js';

export const create = async (patch) => {
  const created = await Patch.create(patch);
  console.log('hi from repo', created);
  return created;
};