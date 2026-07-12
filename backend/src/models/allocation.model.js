import mongoose from "mongoose";

const allocationSchema = new mongoose.Schema(
  {
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: [true, "Asset is required"],
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    allocationDate: {
      type: Date,
      default: Date.now,
    },

    expectedReturnDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "RETURNED", "OVERDUE"],
      default: "ACTIVE",
    },

    returnNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const allocationModel =
  mongoose.models.Allocation || mongoose.model("Allocation", allocationSchema);

export default allocationModel;
