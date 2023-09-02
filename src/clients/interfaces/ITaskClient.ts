export type TaskListId = string;
export type TaskId = string;

export interface ITaskList {
  id: TaskListId;
  title: string;
  description?: string;
}

export interface ITask {
  id: TaskId;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
}

export interface ITaskClient {
  getTasks(): Promise<ITask[]>;
  createTask(taskListId: TaskListId | ITaskList, task: ITask): Promise<ITask>;
  updateTask(taskListId: TaskListId | ITaskList, task: ITask): Promise<ITask>;
  deleteTask(taskListId: TaskListId | ITaskList, taskId: TaskId | ITask): Promise<void>;
  getTaskLists(): Promise<ITaskList[]>;
  getTaskList(taskListId: TaskListId | ITaskList): Promise<ITaskList>;
  createTaskList(taskList: ITaskList): Promise<ITaskList>;
  updateTaskList(taskListId: TaskListId | ITaskList, taskList: string): Promise<ITaskList>;
  deleteTaskList(taskListId: TaskListId | ITaskList): Promise<void>;
}