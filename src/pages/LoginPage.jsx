import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
   
      const response = await axios.post('https://elevo-backend.onrender.com/api/auth/login', { 
        email, 
        password 
      });

      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert("✅ Login Successful!");
      window.location.href = "/"; 
    } catch (error) {
      alert("❌ Login Failed: " + (error.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <main className="container">
      <div className="auth-card">
        <h2>Login to Elevo</h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;