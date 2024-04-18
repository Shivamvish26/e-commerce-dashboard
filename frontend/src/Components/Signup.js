import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();

  const collectdata = async () => {
    // e.preventDefault();
    console.log(name, email, Password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, Password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.warn(result);
    if (result) {
      localStorage.setItem("users", JSON.stringify(result));
      navigate("/");
    }
  };

  useEffect(()=>{
    const auth = localStorage.getItem('users');
    if (auth)
    {
      navigate('/')
    }
  })

  return (
    <div style={{ marginLeft: "30%" }}>
      <h1>Register</h1>
      <input
        className="inputbbox"
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="inputbbox"
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="inputbbox"
        type="Password"
        placeholder="Enter Password"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={collectdata} className="btn-submit" type="button">
        Sign up
      </button>
    </div>
  );
}

export default Signup;
