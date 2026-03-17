import mongoose from "mongoose";

const patchSchema = new mongoose.Schema(
  {
    patch_no: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    work_order: {
      type: String,
      required: true,
      trim: true,
    },

    total_weight: {
      type: Number,
      required: true,
      min: 0,
    },

    total_items: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    total_assembly_under_work: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    total_welding_under_work: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed", "cancelled"],
      default: "pending",
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Patch = mongoose.model("Patch", patchSchema);

export default Patch;