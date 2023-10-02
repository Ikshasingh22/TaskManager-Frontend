import React from "react";
import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import "../App.css"
const User_Home=()=>{
  const [message, setMessage] = useState("");
  const authToken = Cookies.get("authToken");
  const [task, setTask] = useState({
    taskName: '',
    taskDescription: '',
    createdFor: new Date(),
  }); 
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setTask((prevData) => ({
      ...prevData,
      createdFor: date,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/user/task/addtask', task,{
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.data.success === true) {
        setMessage(response.data.message);  
        setTask({
          taskName: '',
    taskDescription: '',
    createdFor: new Date(),
        })     
      }
    } catch (error) {
      console.error('Error sending data:', error);
    


    }
  };
    return(
        <>
        <div className="user-nav-bar">
        
          <NavLink  className="nav-link"to="/mytasks">My Tasks</NavLink>
          <NavLink className="nav-link" to="/logout">LogOut</NavLink>
            </div>
   
          
    <div className="container">
      <h5 className="topics">
        Add Task
      </h5>
      <form onSubmit={handleSubmit} className="htmlForums">
        <div>
          <label className="labelform" htmlFor="email">TaskName</label>
          <input className="inputform" type="text" autoComplete="off"
            value={task.taskName}
            onChange={handleInputs}
            name="taskName" id="taskName" />

        </div>
        <div>
          <label className="labelform" htmlFor="password">TaskDescription</label>
          <input className="inputform" type="text" autoComplete="off"
            value={task.taskDescription}
            onChange={handleInputs}
            name="taskDescription" id="taskDescription" />

        </div>
        <div>
            <label className="labelform" htmlFor="createdFor">
              Created For:-  
            </label>
            <DatePicker
          id="datePicker"
          selected={task.createdFor}
          onChange={handleDateChange}
          dateFormat="dd/MM/yyyy"
        />
          </div>
          <div>
          {/* Display the message state */}
          {message}
        </div>
        <br>
        </br>
        <button className="button" onClick={handleSubmit} type="submit">Add Now</button>

      </form>

    </div>

  
        </>
    )
}
export default User_Home;