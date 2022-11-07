import React, { useState, useEffect } from "react";

import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Header from "./components/Header";

import "./styles.css";

const getLocalStorage = () => {
  let tasks = localStorage.getItem("myTask");
  if (tasks) {
    return JSON.parse(localStorage.getItem("myTask"));
  } else {
    return [];
  }
};

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(getLocalStorage);

  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000 + 1);
    const newTask = {
      id: id,
      ...task,
    };

    setTasks([...tasks, newTask]);
  };

  //delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  //toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...tasks,
              reminder: !task.reminder,
            }
          : task
      )
    );
  };

  const showTaskForm = () => {
    setShowAddTask(!showAddTask);
  };

  useEffect(() => {
    localStorage.setItem("myTask", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <Header onAdd={showTaskForm} title="Task Tracker" showAdd={showAddTask} />
      {showAddTask && <AddTask addTask={addTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          toggleReminder={toggleReminder}
        />
      ) : (
        "No more Tasks"
      )}
    </div>
  );
}

export default App;
