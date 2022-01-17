import Task from "./Task";
import Button from "./Button";
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
        <Button
          Class={`btn ${displayMode === 0 && "taskDisplayOnFocus"}`}
          text="All"
          onClick={() => toggleTasksDisplay(0)}
        />
        <Button
          Class={`btn ${displayMode === 1 && "taskDisplayOnFocus"}`}
          text="Active"
          onClick={() => toggleTasksDisplay(1)}
        />
        <Button
          Class={`btn ${displayMode === 2 && "taskDisplayOnFocus"}`}
          text="Completed"
          onClick={() => toggleTasksDisplay(2)}
        />
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
