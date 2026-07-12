import express from "express";

import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

import { authorizeRoles } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const notificationRouter = express.Router();

notificationRouter.post(
  "/",
  authMiddleware,
  authorizeRoles,
  createNotification,
);

notificationRouter.get("/", authMiddleware, authorizeRoles, getNotifications);

notificationRouter.patch(
  "/:id/read",
  authMiddleware,
  authorizeRoles,
  markAsRead,
);

export default notificationRouter;
