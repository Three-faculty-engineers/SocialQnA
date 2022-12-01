import express from "express"
import { UserController } from "../controller/user.controller";

const userController = new UserController();

const router = express.Router();

router.get("/:email", userController.get);
router.post("/", userController.create);
router.post("/auth", userController.login);
router.delete("/:email", userController.delete);
router.put("/:email", userController.update);

export default router;