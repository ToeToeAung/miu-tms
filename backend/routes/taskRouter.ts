import express from 'express';
import {createTask,getAllTasks} from '../controllers/taskController';

const router = express.Router();
router.get('/', getAllTasks);
router.post('/', createTask);


export default router;