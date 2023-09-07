import { tasks_v1 } from "googleapis";
import React, { useEffect, useState } from "react";
import TaskListView from "./TaskListView";
import useInterval from "./hooks/useInterval";
import useAuth from "./hooks/useAuth";
import GoogleTaskClient from "./clients/GoogleTaskClient";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IProps {}

const TaskPage = (props: IProps) => {
  const [taskLists, setTaskLists] = useState<Array<tasks_v1.Schema$TaskList>>();

  const [expandedLists, setExpandedLists] = useState<Array<string>>([]);
  const [fetchTime, setFetchTime] = useState<number>(0);
  const [autoRefresh, setAutoRefresh] = useState<boolean>(false);
  const [nextRefresh, setNextRefresh] = useState<number>(0);

  const auth = useAuth();

  const fetchTaskLists = async () => {
    const start = Date.now();

    const client = new GoogleTaskClient();

    const taskLists = await client.getTaskLists();
    console.log("taskLists: ", taskLists);
    // fetch("http://localhost:3000/googleauth/task-lists", {
    //   headers: {
    //     "Authorization": `Bearer ${auth.getCredentials('Google')}`
    //   }
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if (!data) {
    //       setTaskLists([]);
    //     } else {
    //       console.log("data: ", data);
    //       setTaskLists(data);
    //       setFetchTime(Date.now() - start);
    //     }
    //   });
  };

  useEffect(() => {
    fetchTaskLists();
  }, []);
  
  useInterval(() => {
    setNextRefresh(nextRefresh - 1 < 0 ? 15 : nextRefresh - 1);

    if (autoRefresh && nextRefresh === 0) {
      fetchTaskLists();
    }
  }, autoRefresh ? 1000 : null);

  function autoRefreshInterface() {
    return (
      <div>
        <p>Next refresh in {nextRefresh} seconds</p>
      </div>
    );
  }

  function fetchStatus() {
    if (!taskLists) {
      return <p>Fetching results from Google Tasks...</p>;
    }

    return <p>Fetch time: {fetchTime} ms</p>;
  }

  function listSection() {
    if (!taskLists || taskLists.length === 0) {
      return <h3>No task lists found</h3>;
    }

    return taskLists.map((list) => {
      if (!list.id) {
        return <p>List without ID: {JSON.stringify(list, undefined, 2)}</p>;
      }

      return expandedLists.includes(list.id) ? (
        <>
          <button
            key={list.id}
            onClick={() => {
              if (list.id === undefined || list.id === null) {
                return;
              }

              setExpandedLists(expandedLists.filter((id) => id !== list.id));
            }}
          >
            X {list.title}
          </button>
          <TaskListView key={list.id} list={list} update={nextRefresh - 1 < 0} />
        </>
      ) : (
        <button
          key={list.id}
          onClick={() => {
            if (list.id === undefined || list.id === null) {
              return;
            }

            setExpandedLists([...expandedLists, list.id]);
          }}
        >
          + {list.title}
        </button>
      );
    });
  }

  return (
    <>
      <h1> Task Lists </h1>
      <label htmlFor="autoRefresh">Auto Refresh</label>
      <input type="checkbox" id="autoRefresh" onClick={() => setAutoRefresh(!autoRefresh)}/>
      {autoRefreshInterface()}
      {fetchStatus()}
      {listSection()}
    </>
  );
};

export default TaskPage;
