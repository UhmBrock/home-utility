import express, { Request, Response } from 'express';
import { ensureLoggedIn } from 'connect-ensure-login';
import GoogleTaskService from '../services/googleTaskService';
import createHttpError from 'http-errors';

const router = express.Router();

router.use(ensureLoggedIn());

router.get('/task-lists', async (req: Request, res: Response) => {
  try {
    console.log("GETTING TASK LISTS");
    const taskLists = await GoogleTaskService.getInstance().getTaskLists();
    res.json(taskLists);
  } catch (err) {
    console.error(err);
    res.send(createHttpError.BadRequest("Error getting task lists"));
  }
}); 

router.get('/tasks/:taskListId', async (req: Request, res: Response) => {
  try {
    const tasks = await GoogleTaskService.getInstance().getTasks(req.params.taskListId);
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.send(createHttpError.BadRequest("Error getting tasks"));
  }
});

export default router;