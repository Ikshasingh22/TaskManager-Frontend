import React from "react";
import TaskView from "./TaskView";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import "../App.css";
const MyTasks=()=>{
    const [tasks, setTasks] = useState([]);
    const authToken = Cookies.get("authToken");
    const [selectedTaskId, setSelectedTaskId] = useState(null);
    const [showTaskView, setShowTaskView] = useState(false);
    const handleViewClick = (taskid) => {
      setSelectedTaskId(taskid);
      setShowTaskView(true);
    };
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/user/task/alltasks", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        // Assuming the API returns an array of tasks, you can set them in the state
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    useEffect(() => {
      fetchTasks(); // Fetch tasks when the component mounts
    }, [authToken]);
    const handleDeleteTask = async (taskId) => {
      try {
        const taskIdToDelete = taskId;
        const response = await axios.delete(`http://localhost:5000/user/task/deletetask/${taskIdToDelete}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if(response.data.success===true){
          fetchTasks();
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };
  
  
    return (
      <>
       <div className="mytasks-nav">
                  Your Tasks
       </div>

       <div className="task-cards">
        {tasks.map((task) => (
            <div key={task.taskId} className="task-card">
            <h3>Task Name: {task.taskName}</h3>
            <p>Task Id: {task.taskId}</p>
            <div className="button-container">
            <NavLink  to={`/taskview?taskId=${task.taskId}`}  className="button">
    View/Update
  </NavLink>
            <button className="button" onClick={() => handleDeleteTask(task.taskId)}>Delete</button>
            </div>
          </div>
        ))}
       
      </div> 
       
      </>
    );
}
export default MyTasks;