import {Router} from "express";
import { createComment, deleteComment, fetchComment, showComment, updateComment } from "../controller/CommentController.js";
let router= Router()

router.post("/",createComment);
router.put("/:id",updateComment);
router.get("/",fetchComment);
router.get("/:id",showComment);
router.delete("/:id",deleteComment);

export default router;