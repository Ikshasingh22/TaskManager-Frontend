import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
const Home=()=>{
    return(
        <>
        <div className="nav">

        
         <NavLink className="texts" to="/login">Login</NavLink>
         <NavLink className="texts" to="/signup"> SignUp</NavLink>
         </div>
         <div className="title">
                 <div className="task">TaskManager
                    </div>
        </div>
        </>
    )
}
export default Home;