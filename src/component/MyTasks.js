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
        const response = await axios.get("https://taskmanagerbackend-py44.onrender.com/user/task/alltasks", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
  
        // returning array of tasks
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    useEffect(() => {
      fetchTasks(); 
    }, [authToken]);
    const handleDeleteTask = async (taskId) => {
      try {
        const taskIdToDelete = taskId;
        const response = await axios.delete(`https://taskmanagerbackend-py44.onrender.com/user/task/deletetask/${taskIdToDelete}`, {
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
               <div className="tasks-nav">
                     Your Tasks
               </div>
       </div>

       <div className="task-cards">
        {tasks.map((task) => (
            <div key={task.taskId} className="task-card">
            <h5>Task Name: {task.taskName}</h5>
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