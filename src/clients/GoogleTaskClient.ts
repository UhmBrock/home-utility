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
  getTaskLists(): Promise<ITaskList[]> {
    throw new Error("Method not implemented.");
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