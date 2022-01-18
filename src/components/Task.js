import { useState } from "react";
import { Button, message, Typography, Checkbox } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";

function Task({ task, toggleTasks, deleteTask, editName }) {
  const [isNameChange, setIsNameChange] = useState(false);

  const validateNewName = (name) => {
    message.destroy();
    if (/^\s*$/.test(name)) {
      message.error("New name is invalid");
    } else {
      editName(name, task.id);
      setIsNameChange(false);
    }
  };

  return (
    <div className="task" style={{ width: "100%" }}>
      <div>
        {/* Toggles whether the task is completed or not */}
        <Checkbox checked={task.completed} onChange={() => toggleTasks(task.id)} />

        <Paragraph
          style={{ marginBottom: "0", marginLeft: "1rem", height: "2rem" }}
          editable={
            isNameChange
              ? {
                  editing: isNameChange,
                  autoSize: { minRows: 1, maxRows: 1 },
                  onChange: (e) => validateNewName(e),
                }
              : false
          }
        >
          {task.name}
        </Paragraph>
      </div>
      <div className="taskEditBtns">
        <Button onClick={() => setIsNameChange(!isNameChange)}> Edit </Button>
        <Button
          style={{ background: "#ff4d4f", color: "white" }}
          onClick={() => deleteTask(task.id)}
        >
          {" "}
          Delete{" "}
        </Button>
      </div>
    </div>
  );
}

export default Task;
