import cookieParser from "cookie-parser";
import express from "express";
import authRouter from "./routes/user.route.js";
import departmentRouter from "./routes/department.route.js";
import cors from "cors";

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

export default app;
