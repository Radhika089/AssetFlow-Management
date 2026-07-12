import express from "express";

import {
  createAsset,
  deleteAsset,
  getAllAssets,
  getAssetById,
  updateAsset,
} from "../controllers/asset.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const assetRouter = express.Router();

assetRouter.post(
  "/create",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  createAsset,
);

assetRouter.get("/", authMiddleware, getAllAssets);

assetRouter.get("/:id", authMiddleware, getAssetById);

assetRouter.patch(
  "/update/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  updateAsset,
);

assetRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  deleteAsset,
);

export default assetRouter;
