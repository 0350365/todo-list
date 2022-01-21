import TaskForm from "./components/TaskForm";
import { useState, useEffect } from "react";

// Error handler for fetch requests
const handleErrors = (res) => {
  if (!res.ok) {
    throw Error(res.statusText);
  }
  return res;
};

function App() {
  const [tasks, setTasks] = useState([]);

  // Get all tasks on component render
  useEffect(() => {
    fetch("/api/tasks")
      .then((res) => handleErrors(res))
      .then((res) => res.json())
      .then((res) => setTasks(res.taskList))
      .catch((err) => console.log(err));
  }, []);

  // Toggles the complteness of the task with the specific id
  const toggleTasks = (id) => {
    fetch(`/api/update/${id}`, {
      method: "PUT",
    })
      .then((res) => handleErrors(res))
      .then(
        setTasks(
          tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        )
      )
      .catch((err) => console.log(err));
  };

  // Adds a new task with a given name and randomy generated id
  const addTask = (name) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => handleErrors(res))
      .then((res) => res.json())
      .then((res) => setTasks([...tasks, { id: res.id, name: name, completed: false }]))
      .catch((err) => console.log(err));
  };

  // Removes the task with the given id
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => handleErrors(res))
      .then(setTasks(tasks.filter((task) => task.id !== id)))
      .catch((err) => console.log(err));
  };

  // Sets a new name for the task with the given id
  const editName = (name, id) => {
    fetch(`/api/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    })
      .then((res) => handleErrors(res))
      .then(setTasks(tasks.map((task) => (task.id === id ? { ...task, name: name } : task))))
      .catch((err) => console.log(err));
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
