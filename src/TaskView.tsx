import { tasks_v1 } from "googleapis";
import React, { useState } from "react";
import { Form } from "react-router-dom";

interface IProps {
  task: tasks_v1.Schema$Task;
}

const TaskView = (props: IProps) => {
  const { task } = props;

  const [taskViewState, setTaskViewState] = useState<string>("collapsed");

  // map all task properties to a list of <li> elements
  const taskProperties = Object.entries(task).map(([key, value]) => {
    return (
      <li key={key}>
        <strong>{key}</strong>: {value.toString()}
      </li>
    );
  });

  const staticFields = ["kind", "etag", "id", "selfLink", "parent", "links"];

  const inputFieldMap: { [index: string]: string } = {
    title: "text",
    notes: "text",
    // due: 'date',
    // updated: 'date',
    position: "number",
    kind: "text",
    etag: "text",
    id: "text",
    selfLink: "url",
    parent: "text",
    links: "text",
    status: "checkbox",
    // completed: 'date',
    completed: "text",
    due: "text",
    updated: "text",
  };

  const taskForm = Object.entries(task).map(([key, value]) => {
    const identifier = key + task.id;

    const inputType = inputFieldMap[key] || "text";
    const readOnly = staticFields.includes(key);

    return (
      <>
        <label
          style={{
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
          }}
          key={identifier + "label"}
        >
          <h3>{key}</h3>
        </label>
        <input
          type={inputType}
          style={{ display: "flex", flexDirection: "column" }}
          key={key}
          defaultValue={value.toString()}
          readOnly={readOnly}
        />
      </>
    );
  });

  return (
    <div>
      <h3>{task.title}</h3>
      <div>
        {/* <ul style={{ textAlign: "start"}}>
          { taskProperties }
        </ul> */}

        <button
          onClick={() =>
            setTaskViewState(taskViewState === "view" ? "collapsed" : "view")
          }
        >
          {taskViewState === "view" ? "Collapse" : "View"}
        </button>
        <button
          onClick={() =>
            setTaskViewState(taskViewState === "edit" ? "collapsed" : "edit")
          }
        >
          {taskViewState === "edit" ? "Collapse" : "edit"}
        </button>
        {taskViewState === "edit" && (
          <form>
            {taskForm}
            <button type="submit">Submit Changes</button>
          </form>
        )}
        {taskViewState === "view" && taskProperties}
      </div>
    </div>
  );
};

export default TaskView;
