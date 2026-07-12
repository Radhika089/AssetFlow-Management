import express from "express";

import {
  allocateAsset,
  getAllocations,
  returnAsset,
} from "../controllers/allocation.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const allocationRouter = express.Router();

allocationRouter.post(
  "/create",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  allocateAsset,
);

allocationRouter.get("/", authMiddleware, getAllocations);

allocationRouter.patch(
  "/return/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  returnAsset,
);

export default allocationRouter;
