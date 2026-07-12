import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";

import { authorizeRoles } from "../middleware/role.middleware.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, authorizeRoles, createBooking);

bookingRouter.get("/", authMiddleware, authorizeRoles, getAllBookings);

bookingRouter.patch(
  "/:id/status",
  authMiddleware,
  authorizeRoles,
  updateBookingStatus,
);

bookingRouter.delete("/:id", authMiddleware, authorizeRoles, deleteBooking);

export default bookingRouter;
