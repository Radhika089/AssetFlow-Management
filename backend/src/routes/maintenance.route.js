import express from "express";
import {
  createMaintenanceRequest,
  approveMaintenance,
  rejectMaintenance,
  resolveMaintenance,
} from "../controllers/maintenance.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const maintenanceRouter = express.Router();

maintenanceRouter.post("/create", authMiddleware, createMaintenanceRequest);

maintenanceRouter.patch(
  "/approve/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  approveMaintenance,
);

maintenanceRouter.patch(
  "/reject/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  rejectMaintenance,
);

maintenanceRouter.patch(
  "/resolve/:id",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager"),
  resolveMaintenance,
);

export default maintenanceRouter;
