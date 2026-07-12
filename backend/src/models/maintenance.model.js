import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: [true, "Asset is required"],
    },

    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: [true, "Requester is required"],
    },

    issue: {
      type: String,
      required: [true, "Issue description is required"],
      trim: true,
    },

    priority: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"],
      default: "MEDIUM",
    },

    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED", "IN_PROGRESS", "RESOLVED"],
      default: "PENDING",
    },

    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      default: null,
    },

    resolvedDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const maintenanceModel =
  mongoose.models.Maintenance ||
  mongoose.model("Maintenance", maintenanceSchema);

export default maintenanceModel;
