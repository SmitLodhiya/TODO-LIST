// src/Login.js
import React, { useState } from 'react';
import './App.css'; // Ensure this imports your styles
import { loginWithEmail, loginWithGoogle } from './auth'; // Assuming you have the appropriate functions

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginWithEmail(email, password);
      alert("Login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      alert("Google login successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="todo-wrapper"> {/* Use your existing wrapper style */}
      <h2 style={{ textAlign: 'center' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="todo-input-item"> {/* Consistent input item styling */}
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
          />
        </div>
        <div className="todo-input-item">
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </div>
        <div className="todo-input-item">
          <button type="submit" className="primaryBtn">Login</button>
        </div>
      </form>
      <div className="todo-input-item">
        <button onClick={handleGoogleLogin} className="primaryBtn" style={{ width: '100%' }}>Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
