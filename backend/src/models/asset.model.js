import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Asset name is required"],
      trim: true,
    },

    assetTag: {
      type: String,
      unique: true,
      uppercase: true,
    },

    serialNumber: {
      type: String,
      unique: true,
      trim: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategory",
      required: [true, "Asset category is required"],
    },

    condition: {
      type: String,
      enum: ["NEW", "GOOD", "FAIR", "DAMAGED"],
      default: "GOOD",
    },

    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    acquisitionDate: {
      type: Date,
    },

    acquisitionCost: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: [
        "AVAILABLE",
        "ALLOCATED",
        "RESERVED",
        "UNDER_MAINTENANCE",
        "LOST",
        "RETIRED",
        "DISPOSED",
      ],
      default: "AVAILABLE",
    },

    isBookable: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const assetModel =
  mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export default assetModel;
