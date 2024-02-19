import {Router} from "express";
import { createPost, deletePost, fetchposts, showPost, updatePost } from "../controller/PostController.js";
let router= Router()

router.post("/",createPost);
router.put("/:id",updatePost);
router.get("/",fetchposts);
router.get("/:id",showPost);
router.delete("/:id",deletePost);

export default router;