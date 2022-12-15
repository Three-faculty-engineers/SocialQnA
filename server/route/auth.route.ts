import express from "express";
import { AuthController } from "../controller/auth.controller";

const authController = new AuthController();
const router = express.Router();

router.post("/", authController.login);

export default router;