import express from "express"
import { UserController } from "../controller/user.controller";

const userController = new UserController();

const router = express.Router();

router.get("/:id", userController.get);

router.post("/", userController.create);
router.post("/like/post", userController.likePost);
router.post("/dislike/post", userController.dislikePost);
router.post("/like/comment", userController.likeComment);
router.post("/dislike/comment", userController.dislikeComment);
router.post("/follow/community", userController.followCommunity);
router.post("/follow/user", userController.followUser);

router.delete("/:id", userController.delete);

router.put("/:id", userController.update);


export default router;