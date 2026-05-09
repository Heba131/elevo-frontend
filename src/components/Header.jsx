import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png.png'; 

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); 

  const handleLogout = async () => {
    try {

      await axios.post('https://elevo-backend.onrender.com/api/auth/logout');
      
  
      localStorage.removeItem('user');
      
      alert("Logged out successfully");
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error);
     
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  return (
    <header className="main-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Elevo Logo" className="site-logo" />
        <h2 style={{ color: 'white', margin: 0 }}>ELEVO</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        
       
        {user ? (
          <>
            <li><Link to="/add-product">Add Product</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Logout</button></li>
            <li style={{ color: '#00a3ff', fontWeight: 'bold' }}>Hi, {user.username}</li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;