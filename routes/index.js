import { Router } from "express";
import userRouters from "./userRoutes.js"
import postRouters from "./postRoutes.js"
import commentRouters from "./commentRoutes.js"
const router =Router();



router.use("/api/user",userRouters);
router.use("/api/post",postRouters);
router.use("/api/comment",commentRouters);


export default router;