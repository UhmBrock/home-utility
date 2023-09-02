import React, { useEffect, useState } from 'react';
import TaskView from './TaskView';
import { tasks_v1 } from 'googleapis';
import useAuth from './hooks/useAuth';

interface IProps {
  list: tasks_v1.Schema$TaskList,
  update: boolean
}

// export type Task = {
//   due?: string, // "2021-03-31T00:00:00.000Z" due date
//   etag: string,
//   id: string,
//   kind: string, // "tasks#task"
//   links: Array<any>, 
//   notes?: string, // attached file e.g. "📎SCN1688163385710.pdf (https://drive.google.com/open?id=1YdHLvXWVkAe3J8yindL6jSZwaUJa-cWT)"
//   parent?: string, // task id of parent task, only appears on subtask
//   position: string, // "00000000000000000001" order in list
//   selfLink: string,
//   status: string, // "needsAction" or "completed"
//   title: string, // Primary task title
//   updated: string, // "2021-03-31T00:00:00.000Z" last updated
// }

const TaskListView = (props: IProps) => {

  const auth = useAuth();
  const { list } = props;
  const [tasks, setTasks] = useState<Array<tasks_v1.Schema$Task>>();

  useEffect(() => {
    fetch(`http://localhost:4000/googleauth/tasks/${list.id}`, {
      headers: {
        'Authorization': `Bearer ${auth.getCredentials('Google')}`
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log("data: ", data);
          setTasks(data);
        }        
      });
  }, [list.id]);

  return (
    <div>
      <h2> {list.title} </h2>
      {tasks && tasks.map((task) => (
        <TaskView key={task.id} task={task}/>
      ))}
    </div>
  );
}

export default TaskListView;
