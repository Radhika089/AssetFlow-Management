import express from "express";
import { authorizeRoles } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  createDepartment,
  deleteDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
} from "../controllers/department.controller.js";

const departmentRouter = express.Router();

departmentRouter.get(
  "/",
  authMiddleware,
  authorizeRoles("Admin"),
  getAllDepartments,
);
departmentRouter.post(
  "/create",
  authMiddleware,
  authorizeRoles("Admin"),
  createDepartment,
);
departmentRouter.get(
  "/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  getDepartmentById,
);
departmentRouter.patch(
  "/update/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  updateDepartment,
);
departmentRouter.delete(
  "/delete/:id",
  authMiddleware,
  authorizeRoles("Admin"),
  deleteDepartment,
);

export default departmentRouter;
