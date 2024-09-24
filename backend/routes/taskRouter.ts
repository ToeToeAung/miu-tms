import express from 'express';
import {createTask,deleteTaskById,getAllTasks} from '../controllers/taskController';

const router = express.Router();
router.get('/', getAllTasks);
router.post('/', createTask);
router.delete('/:taskId',deleteTaskById)

export default router;