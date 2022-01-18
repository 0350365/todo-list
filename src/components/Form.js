import { useState } from "react";
import { Button, message, Input } from "antd";
import TaskContainer from "./TaskContainer";

function Form({ tasks, addTask, toggleTasks, deleteTask, editName }) {
  const [taskName, setTaskName] = useState("");

  const handleName = (e) => {
    setTaskName(e);
  };

  // Check if task name has at least one non-whitespace character in it
  const submitTask = () => {
    message.destroy();
    /^\s*$/.test(taskName) ? message.error("Invalid task name") : addTask(taskName);
    setTaskName("");
  };

  return (
    <div className="mainForm">
      What needs to be done?
      <Input
        value={taskName}
        style={{ width: "60%" }}
        placeholder="Task name"
        onChange={(e) => handleName(e.target.value)}
      />
      <Button style={{ width: "60%", margin: "5px" }} type="primary" onClick={submitTask}>
        Add
      </Button>
      <TaskContainer
        tasks={tasks}
        toggleTasks={toggleTasks}
        deleteTask={deleteTask}
        editName={editName}
      />
    </div>
  );
}

export default Form;
