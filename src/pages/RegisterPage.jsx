import React, { useState } from 'react'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const RegisterPage = () => {

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    
    const response = await axios.post('https://elevo-backend.onrender.com/api/auth/register', {
        username: fullName, 
        email: email,
        password: password
      });

      alert("✅ " + response.data.message);
      navigate('/login');
    } catch (error) {
  
      alert("❌ خطأ: " + (error.response?.data?.error || "فشل التسجيل"));
    }
  };

  return (
    <main className="container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Join us to get the latest tech deals</p>
        

        <form onSubmit={handleRegister}>
         
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required 
          />

          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />

          <input 
            type="password" 
            placeholder="Create Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />

          <button type="submit" className="btn">Register</button>
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;