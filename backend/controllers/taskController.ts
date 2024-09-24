import { Request, Response, NextFunction } from "express";
import Task from "../models/task";

export const createTask = (req: Request, res: Response, next: NextFunction) => {
    const {content,  completed, position, priority } = req.body;
    const newTask = Task.createTask(content, completed, position, priority);
     res.status(201).json({
    message: "Task created successfully",
    task: newTask
  });
}


export const getAllTasks = (req: Request, res: Response, next: NextFunction) => {
  console.log('GET /tasks called');
  res.status(200).json({ success: true, data : Task.getAllTasks() });
};

