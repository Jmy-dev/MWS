import { createPatch, getMyPatches as getMyPatchesService, getPatchById as getPatchByIdService } from '../services/patch.service.js';

const create = async (req, res, next) => {
  try {
    const patch = await createPatch(
      req.body.patch_no,
      req.body.work_order,
      req.body.total_weight,
      req.body.total_items,
      req.body.total_assembly_under_work,
      req.body.total_welding_under_work,
      req.body.status,
      req.user.id,
      req.body.items,
      req.correlationId
    );
    res.status(201).json({ patch });
  } catch (error) {
    next(error);
  }
};

const getMyPatches = async (req, res, next) => {
  try {
    const patches = await getMyPatchesService(req.user.id, req.correlationId);
    res.status(200).json({ patches });
  } catch (error) {
    next(error);
  }
};

const getPatchById = async (req, res, next) => {
  try {
    const patch = await getPatchByIdService(req.params.id, req.correlationId);
    res.status(200).json({ patch });
  } catch (error) {
    next(error);
  }
};

export { create, getMyPatches, getPatchById };