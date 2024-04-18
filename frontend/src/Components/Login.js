import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    console.log(email, password);
    let result = await fetch("http://localhost:5000/login", {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
   if(result.email){
    localStorage.setItem('users',JSON.stringify(result));
    navigate('/')
   }
    else {
      toast.error("Invalid Email or Password");
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("users");
    if (auth) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login">
      <h1>Login</h1>
      <input
        type="email"
        className="inputbbox"
        value={email}
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="inputbbox"
        value={password}
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handlelogin} className="btn-submit" type="button">
        Login
      </button>
      <ToastContainer /> {/* Toast container */}
    </div>
  );
}

export default Login;
