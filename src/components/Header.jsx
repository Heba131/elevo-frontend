import { Link } from 'react-router-dom';
import logo from '../assets/logo.png.png'; 

const Header = () => {
  return (
    <header className="main-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src={logo} alt="Elevo Logo" className="site-logo" />
        <h2 style={{ color: 'white', margin: 0 }}>ELEVO</h2>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        
   
        <li><Link to="/add-product">Add Product</Link></li>
        
        <li><Link to="/about">About</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </header>
  );
};

export default Header;