import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { authorizeRoles } from "../middleware/role.middleware.js";

const dashboardRouter = express.Router();

dashboardRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("Admin", "Asset Manager", "Department Head"),
  getDashboard,
);

export default dashboardRouter;
