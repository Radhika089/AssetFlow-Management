import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/user.route.js";
import departmentRouter from "./routes/department.route.js";
import cors from "cors";
import categoryRouter from "./routes/assetCategory.route.js";
import assetRouter from "./routes/asset.route.js";
import allocationRouter from "./routes/allocation.route.js";
import maintenanceRouter from "./routes/maintenance.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import bookingRouter from "./routes/booking.route.js";
import notificationRouter from "./routes/notification.route.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);
app.use("/api/category", categoryRouter);
app.use("/api/assets", assetRouter);
app.use("/api/allocation", allocationRouter);
app.use("/api/maintenance", maintenanceRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/notifications", notificationRouter);

export default app;
