import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useLocation } from "react-router-dom";

const TaskView = () => {
  const authToken = Cookies.get("authToken");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const taskId = searchParams.get("taskId");

  const [task, setTask] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");
  
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/task/taskdetails/${taskId}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        setTask(response.data.task);
        setEditedTaskName(response.data.task.taskName);
        setEditedTaskDescription(response.data.task.taskDescription);
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/user/task/updatetask/${taskId}`,
        {
          taskName: editedTaskName,
          taskDescription: editedTaskDescription,

        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      // Assuming the server responds with the updated task data
      setTask(response.data.updatedTask);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div>
      {task ? (
        <>
          <h2>Task Details</h2>
          {editMode ? (
            <>
              <label>
                Task Name:
                <input
                  type="text"
                  value={editedTaskName}
                  onChange={(e) => setEditedTaskName(e.target.value)}
                />
              </label>
              <label>
                Task Description:
                <input
                  type="text"
                  value={editedTaskDescription}
                  onChange={(e) => setEditedTaskDescription(e.target.value)}
                />
              </label>
              
              <button onClick={handleUpdate}>Update</button>
            </>
          ) : (
            <>
              <p>Task Name: {task.taskName}</p>
              <p>Task Description: {task.taskDescription}</p>
              <p>Created For: {task.createdFor}</p>
              <button onClick={() => setEditMode(true)}>Edit</button>
            </>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default TaskView;
