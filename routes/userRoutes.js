import {Router} from "express";
import { createUser, fetchUsers, showUser, updateuser,deleteUser } from "../controller/UserController.js";
let router= Router()

router.post("/",createUser);
router.put("/:id",updateuser);
router.get("/",fetchUsers);
router.get("/:id",showUser);
router.delete("/:id",deleteUser);

export default router;