import { Router } from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController";
import { getUsers, postUser, getUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/create-user", postUser);
router.get("/:cognitoId", getUser)

export default router;