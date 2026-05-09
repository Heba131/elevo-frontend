import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MainPage from './pages/MainPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddProduct from './pages/AddProduct'; 
import './App.css';

function App() {
  return (
    <Router>
      <Header /> 
      <Routes>
        <Route path=\"/\" element={<MainPage />} />
        <Route path=\"/about\" element={<AboutPage />} />
        <Route path=\"/login\" element={<LoginPage />} />
        <Route path=\"/register\" element={<RegisterPage />} />
        <Route path=\"/add-product\" element={<AddProduct />} /> 
      </Routes>
    </Router>
  );
}
export default App;