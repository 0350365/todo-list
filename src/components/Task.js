import { useState } from "react";
import Button from "./Button";

function Task({ task, toggleTasks, deleteTask, editName }) {
  const [isNameChange, setIsNameChange] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleNameChange = e => {
    setNewName(e);
  };

  const validateNewName = name => {
    if (/^\s*$/.test(name)) {
      alert("New name is invalid");
    } else {
      editName(newName, task.id);
      setIsNameChange(false);
    }
  };

  return (
    <div className="task">
      <div>
        {/* Toggles whether the task is completed or not */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTasks(task.id)}
        ></input>
        {isNameChange ? (
          <>
            <input
              type="text"
              value={newName}
              onChange={e => handleNameChange(e.target.value)}
            ></input>
            <Button
              Class="btn"
              text="Save"
              onClick={() => {
                validateNewName(newName);
              }}
            />
          </>
        ) : (
          task.name
        )}
      </div>
      <div className="taskEditBtns">
        <Button Class="btn" text="Edit" onClick={() => setIsNameChange(!isNameChange)} />
        <Button Class="btn delete" text="Delete" onClick={() => deleteTask(task.id)} />
      </div>
    </div>
  );
}

export default Task;
