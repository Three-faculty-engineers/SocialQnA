import express from "express"
import { UserController } from "../controller/user.controller";

const userController = new UserController();

const router = express.Router();

router.get("/:id", userController.get);
router.post("/", userController.create);
router.post("/auth", userController.login);
router.delete("/:id", userController.delete);
router.put("/:id", userController.update);

export default router;