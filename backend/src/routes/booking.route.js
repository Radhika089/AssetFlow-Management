import express from "express";
import {
  createBooking,
  getAllBookings,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const bookingRouter = express.Router();

bookingRouter.post("/", authMiddleware, createBooking);

bookingRouter.get("/", authMiddleware, getAllBookings);

bookingRouter.patch("/:id/status", authMiddleware, updateBookingStatus);

bookingRouter.delete("/:id", authMiddleware, deleteBooking);

export default bookingRouter;
