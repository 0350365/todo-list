import { useState } from "react";
import { Button, message } from "antd";

function Task({ task, toggleTasks, deleteTask, editName }) {
  const [isNameChange, setIsNameChange] = useState(false);
  const [newName, setNewName] = useState(task.name);

  const handleNameChange = e => {
    setNewName(e);
  };

  const validateNewName = name => {
    message.destroy();
    if (/^\s*$/.test(name)) {
      message.error('New name is invalid');
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
            <Button onClick={() => {validateNewName(newName);}}>Save</Button>
          </>
        ) : (
          task.name
        )}
      </div>
      <div className="taskEditBtns">
        <Button onClick={() => setIsNameChange(!isNameChange)} > Edit </Button>
        <Button style={{ background:'#ff4d4f', color:'white' }} onClick={() => deleteTask(task.id)} > Delete </Button>
      </div>
    </div>
  );
}

export default Task;
