import express, { Request, Response } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';
import GoogleTaskService from '../services/googleTaskService';

const router = express.Router();

router.get('/task-lists', async (req: Request, res: Response) => {
  try {
    const taskLists = await GoogleTaskService.getInstance().getTaskLists();
    res.json(taskLists);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}); 

router.get('/tasks/:taskListId', async (req: Request, res: Response) => {
  try {
    const tasks = await GoogleTaskService.getInstance().getTasks(req.params.taskListId);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

export default router;