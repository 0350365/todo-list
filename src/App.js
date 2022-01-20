import TaskForm from "./components/TaskForm";
import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  // Toggles the complteness of the task with the specific id
  const toggleTasks = (id) => {
    fetch(`/api/update/${id}`, {
      method: "PUT",
    });
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  useEffect(() => {
    try {
      fetch("/api/tasks")
        .then((res) => res.json())
        .then((res) => setTasks(res.taskList));
    } catch (err) {
      console.log("Error:", err);
    }
  }, []);

  // Adds a new task with a given name and randomy generated id
  const addTask = (name) => {
    try {
      fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      })
        .then((res) => res.json())
        .then((res) => setTasks([...tasks, { id: res.id, name: name, completed: false }]));
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  };

  // Removes the task with the given id
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Sets a new name for the task with the given id
  const editName = (name, id) => {
    fetch(`/api/update/${id}/${name}`, {
      method: "PUT",
    });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, name: name } : task)));
  };

  return (
    <div className="formContainer">
      {" "}
      <TaskForm
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
