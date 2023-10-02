import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../App.css"

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(""); 

  const [user, setUser] = useState(
    {
      email: "",
      password: "",
    }
  );
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://taskmanagerbackend-py44.onrender.com/user/login', user);
      if (response.data.success === true) {
        onLogin(true); 
        navigate('/userhome');
          Cookies.set('authToken', response.data.token, { expires: 7 });
      }
      else if (response.data.status === false) {
        setMessage(response.data.message);
      }

    } catch (error) {
      console.error('Error sending data:', error);
    
    }
  };

  return <>
    <div className="container">
      <h5 className="topics">
        Login
      </h5>
      <form onSubmit={handleSubmit} className="htmlForums">

        <div>
          <label className="labelform" htmlFor="email">Email</label>
          <input className="inputform" type="text" autoComplete="off"
            value={user.email}
            onChange={handleInputs}
            name="email" id="email" />

        </div>
        <div>
          <label className="labelform" htmlFor="password">Password</label>
          <input className="inputform" type="text" autoComplete="off"
            value={user.password}
            onChange={handleInputs}
            name="password" id="password" />

        </div>
        <div>
    
          {message}
        </div>
        <br>
        </br>
        <button className="button" onClick={handleSubmit} type="submit">Login</button>

      </form>

    </div>

  </>





}

export default Login;