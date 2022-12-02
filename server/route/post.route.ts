import express from "express";
import { PostController } from "../controller/post.controller";

const postController = new PostController();

const router = express.Router();

router.get("/:id", postController.get);
router.post("/", postController.create);
router.delete("/:id", postController.delete);
router.put("/:id", postController.update);

export default router
