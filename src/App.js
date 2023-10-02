import React, { useState } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./component/Home";
import User_Home from './component/User_Home';
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import MyTasks from "./component/MyTasks";
import TaskView from "./component/TaskView";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (isLoggedIn) => {
    setIsLoggedIn(isLoggedIn);
  };
  return (
    
       <>
       
       <Routes>
    {isLoggedIn ? (
     <>
        <Route path="/userhome" element={<User_Home />} />
        <Route path="/mytasks" element={<MyTasks />} />
        <Route path="/taskview" element={<TaskView />} />
      </>
    ) : (
    <>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      

    </>
  )}
</Routes>


       </>
       
  );
}

export default App;
