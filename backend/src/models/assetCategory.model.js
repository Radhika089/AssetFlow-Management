import mongoose from "mongoose";

const assetCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      unique: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  },
);

const assetCategoryModel =
  mongoose.models.AssetCategory ||
  mongoose.model("AssetCategory", assetCategorySchema);

export default assetCategoryModel;
