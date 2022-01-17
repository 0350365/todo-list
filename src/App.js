import Form from "./components/Form";
import { useState } from "react";

function App() {
  const defaultTasks = [
    { id: 1, name: "Eat", completed: false },
    { id: 2, name: "Sleep", completed: false },
    { id: 3, name: "Repeat", completed: true },
    { id: 4, name: "a", completed: true },
  ];

  const [tasks, setTasks] = useState(defaultTasks.slice());

  // Toggles the cmplteness of the task with the specific id
  const toggleTasks = id => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  // Adds a new task with a given name and randomy generated id
  const addTask = name => {
    setTasks([
      ...tasks,
      { id: Math.floor((Math.random() * Date.now()) / 100000), name: name, completed: false },
    ]);
  };

  // Removes the task with the given id
  const deleteTask = id => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Sets a new name for the task with the given id
  const editName = (name, id) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, name: name } : task)));
  };

  return (
    <div className="formContainer">
      {" "}
      <Form
        tasks={tasks}
        addTask={addTask}
        toggleTasks={toggleTasks}
        deleteTask={deleteTask}
        editName={editName}
      />{" "}
    </div>
  );
}

export default App;
