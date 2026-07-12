import express from "express";
import { registerUser } from "../controllers/user.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
// authRouter.post("/login");

export default authRouter;
