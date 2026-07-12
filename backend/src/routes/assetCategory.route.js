import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controllers/assetCategory.controller.js";

const categoryRouter = express.Router();

categoryRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("Admin"),
  getAllCategories,
);

categoryRouter.post(
  "/create",
  authMiddleware,
  authorizeRoles("Admin"),
  createCategory,
);

categoryRouter.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  getCategoryById,
);

categoryRouter.patch(
  "/update/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  updateCategory,
);

categoryRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  deleteCategory,
);

export default categoryRouter;
