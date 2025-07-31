import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController";
import { getUsers, postUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", postUser)

export default router;