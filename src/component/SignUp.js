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
  const [message, setMessage] = useState(""); // Use setMessage to update message

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
      const response = await axios.post('http://localhost:5000/user/signup', user);
      if (response.data.success === true) {
        console.log('Data sent successfully:', response.data);
        setUser({
          name: "",
          email: "",
          password: "",
        });
        // Use setMessage to update message
        setMessage(response.data.message);
      }
      else if (response.data.success === false) {
        setUser({
          name: "",
          email: "",
          password: "",
        });
        // Use setMessage to update message
        setMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setUser({
        name: "",
        email: "",
        password: "",
      });
      // Handle error, like showing an error message
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
            value={user.email}
            onChange={handleInputs}
            name="email"
            id="email"
          />
        </div>
        <div>
          {/* Display the message state */}
          {message}
        </div>
        <br></br>
        <button className="button" onClick={handleSubmit} type="submit">SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
