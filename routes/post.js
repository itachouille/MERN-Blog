import express from "express";
import {
  createPost,
  getAllPosts,
  getOnePost,
  updatePost,
  deletePost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/post", createPost);
router.get("/posts", getAllPosts);
router.get("/post/:id", getOnePost);
router.patch("/post/:id", updatePost);
router.delete("/post/:id", deletePost);

export default router;
