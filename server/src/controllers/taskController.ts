import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixTaskIdSequence() {
  await prisma.$queryRawUnsafe(`
    SELECT setval(pg_get_serial_sequence('\"Task\"', 'id'), COALESCE(MAX(id), 1)) FROM \"Task\";
  `);
}

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const {projectId} = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: Number(projectId),
      },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: `Error retrieving tasks: ${error.message}` });
  }
};



export const createTask = async (
  req: Request, 
  res: Response
): Promise<void> => {
  // const {
  //   title,
  //   description,
  //   status,
  //   priority,
  //   tags,
  //   startDate,
  //   dueDate,
  //   points,
  //   projectId,
  //   authorUserId,
  //   assignedUserId,
  // } = req.body ?? {};
  const { id, title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId } = req.body ?? {};

  try {
    console.log("Received id in request body when creating task: ", id);
    
    await fixTaskIdSequence();

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        tags,
        startDate,
        dueDate,
        points,
        projectId,
        authorUserId,
        assignedUserId,
      },
    });
    console.log("Creating task with:", req.body);
    res.status(201).json(newTask);
  } catch (error : any) {
    console.error("Error creating task with:", JSON.stringify(req.body, null, 2));
    console.error("Full error:", error);
    console.log("Error Creating task with:", req.body);
    res
    .status(500)
    .json({ message: `Error creating a task: ${error.message}` });
  }
};


export const updateTaskStatus = async (req: Request, res: Response): Promise<void> => {
  const {taskId} = req.params
  const {status} = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: Number(taskId),
      },
      data: {
        status: status,
      }
    });
    res.json(updatedTask);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error updating task: ${error.message}` });
  }
};

export const getUserTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { userId } = req.params;
  try {
    const tasks = await prisma.task.findMany({
      where: {
        OR: [
          { authorUserId: Number(userId) },
          { assignedUserId: Number(userId) },
        ],
      },
      include: {
        author: true,
        assignee: true,
      },
    });
    res.json(tasks);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving user's tasks: ${error.message}` });
  }
};