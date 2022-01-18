import Task from "./Task";
import { Button } from "antd";
import { useState } from "react";

function TaskContainer({ tasks, toggleTasks, deleteTask, editName }) {
  // 0 = All tasks, 1 = Active tasks, 2 = Completed tasks
  const [displayMode, setDisplayMode] = useState(0);

  const toggleTasksDisplay = type => {
    setDisplayMode(type);
  };

  // Returns the right tasks to display given the selected display option
  const displayTasks = () => {
    switch (displayMode) {
      case 0:
        return tasks;
      case 1:
        return tasks.filter(task => !task.completed);
      default:
        return tasks.filter(task => task.completed);
    }
  };

  return (
    <div className="taskContainer">
      <div className="taskDisplayOptions">
        <Button className={`ant-btn ${displayMode === 0 && "taskDisplayOnFocus"}`} onClick={() => toggleTasksDisplay(0)} >All</Button>
        <Button className={`ant-btn ${displayMode === 1 && "taskDisplayOnFocus"}`} onClick={() => toggleTasksDisplay(1) } >Active</Button>
        <Button className={`ant-btn ${displayMode === 2 && "taskDisplayOnFocus"}`} onClick={() => toggleTasksDisplay(2)} >Completed</Button>

      </div>

      {/* Create Task component for each item in tasks */}
      <div id="taskCounter">{`${displayTasks().length} tasks remaining`}</div>
      {displayTasks().map(task => (
        <Task
          task={task}
          key={task.id}
          toggleTasks={toggleTasks}
          deleteTask={deleteTask}
          editName={editName}
        />
      ))}
    </div>
  );
}

export default TaskContainer;
