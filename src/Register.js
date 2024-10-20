// src/Register.js
import React, { useState } from 'react';
import { registerWithEmail } from './auth';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      alert("Registration successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="todo-wrapper">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="todo-input-item">
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
          <button type="submit" className="primaryBtn">Register</button>
        </div>
      </form>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p>Already registered? <Link to="/login" style={{ color: 'rgb(0,230,122)' }}>Sign In</Link></p>
      </div>
    </div>
  );
};

export default Register;
