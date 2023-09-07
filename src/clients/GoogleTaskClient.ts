import { ITask, ITaskClient, ITaskList } from "./interfaces/ITaskClient";

export default class GoogleTaskClient implements ITaskClient{
  getTasks(): Promise<ITask[]> {
    throw new Error("Method not implemented.");
  }
  createTask(taskListId: string | ITaskList, task: ITask): Promise<ITask> {
    throw new Error("Method not implemented.");
  }
  updateTask(taskListId: string | ITaskList, task: ITask): Promise<ITask> {
    throw new Error("Method not implemented.");
  }
  deleteTask(taskListId: string | ITaskList, taskId: string | ITask): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getTaskLists(): Promise<ITaskList[]> {
    const URL = 'http://localhost:3000/google-tasks/task-lists';
    return await fetch(URL, {
      method: 'GET',
      
    })
    .then( (res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Error getting task lists');
    });
  }
  getTaskList(taskListId: string | ITaskList): Promise<ITaskList> {
    throw new Error("Method not implemented.");
  }
  createTaskList(taskList: ITaskList): Promise<ITaskList> {
    throw new Error("Method not implemented.");
  }
  updateTaskList(taskListId: string | ITaskList, taskList: string): Promise<ITaskList> {
    throw new Error("Method not implemented.");
  }
  deleteTaskList(taskListId: string | ITaskList): Promise<void> {
    throw new Error("Method not implemented.");
  }
}