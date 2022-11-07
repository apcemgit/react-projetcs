import React, { useState } from "react";

const AddTask = ({ addTask }) => {
  const [task, setTask] = useState({
    text: "",
    day: "",
  });

  const [reminder, setReminder] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => {
      return {
        ...prevTask,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.text) {
      alert("Please add a Task");
    }

    addTask({
      text: task.text,
      day: task.day,
      reminder: reminder,
    });

    setTask({
      text: "",
      day: "",
    });

    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          name="text"
          type="text"
          placeholder="Add Task"
          value={task.text}
          onChange={handleChange}
        />
      </div>
      <div className="form-control">
        <label>Day & Time</label>
        <input
          name="day"
          type="text"
          placeholder="Add Day & Time"
          value={task.day}
          onChange={handleChange}
        />
      </div>
      <div className="from-control form-control-check">
        <label>Reminder</label>
        <input
          name="reminder"
          type="checkbox"
          onChange={(e) => setReminder(e.currentTarget.checked)}
          checked={reminder}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block"/>
    </form>
  );
};

export default AddTask;
