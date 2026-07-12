import express from "express";

import {
  createNotification,
  getNotifications,
  markAsRead,
} from "../controllers/notification.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const notificationRouter = express.Router();

notificationRouter.post("/", authMiddleware, createNotification);

notificationRouter.get("/", authMiddleware, getNotifications);

notificationRouter.patch("/:id/read", authMiddleware, markAsRead);

export default notificationRouter;
