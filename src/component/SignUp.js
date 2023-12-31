import React from "react";
import "../App.css"
import axios from "axios";
import { useState } from "react";
const SignUp = () => {
  const [user, setUser] = useState(
    {
      name: "",
      email: "",
      password: "",
    }
  );
  const [message, setMessage] = useState("");

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
      const response = await axios.post('https://taskmanagerbackend-py44.onrender.com/user/signup', user);
      if (response.data.success === true) {
        console.log('Data sent successfully:', response.data);
        setUser({
          name: "",
          email: "",
          password: "",
        });
        
        setMessage(response.data.message);
      }
      else if (response.data.success === false) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
  
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      
    }
  };

  return (
    <div className="container">
      <h5 className="topics">SignUp</h5>
      <form onSubmit={handleSubmit} className="htmlForums">
        <div>
          <label className="labelform" htmlFor="customerName">Name</label>
          <input
            className="inputform"
            type="text"
            autoComplete="off"
            value={user.name}
            onChange={handleInputs}
            name="name"
            id="name"
          />
        </div>
        <div>
          <label className="labelform" htmlFor="password">Password</label>
          <input
            className="inputform"
            type="text"
            autoComplete="off"
            value={user.password}
            onChange={handleInputs}
            name="password"
            id="password"
          />
        </div>
        <div>
          <label className="labelform" htmlFor="email">Email</label>
          <input
            className="inputform"
            type="text"
            autoComplete="off"
            value={user.email}
            onChange={handleInputs}
            name="email"
            id="email"
          />
        </div>
        <div>
          
          {message}
        </div>
        <br></br>
        <button className="button" onClick={handleSubmit} type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
