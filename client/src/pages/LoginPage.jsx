import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        email,
        password
      });

      if (res.data === "Login successful") {
        navigate('/dashboard'); // navigate on success
      } else {
        setErrorMsg("Invalid credentials");
      }
    } catch (err) {
      setErrorMsg("Server error or unauthorized");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br/>
      <button onClick={handleLogin}>Login</button>
      <p style={{ color: 'red' }}>{errorMsg}</p>
    </div>
  );
}

export default Login;
