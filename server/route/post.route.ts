import express from "express";
import { PostController } from "../controller/post.controller";

const postController = new PostController();

const router = express.Router();

router.get("/:id", postController.get);
router.get("/user/:userID", postController.getByUserID);
router.get("/community/:communityID", postController.getByCommunityID);
router.post("/", postController.create);
router.post("/visit/:id", postController.visitPost);
router.delete("/:id", postController.delete);
router.put("/:id", postController.update);

export default router
