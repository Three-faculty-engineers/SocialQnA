import express from "express"
import { UserController } from "../controller/user.controller";

const userController = new UserController();

const router = express.Router();

router.post("/", userController.create);

export default router;