import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Phones');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
      const response = await axios.post('https://elevo-backend.onrender.com/api/products', {
        name,
        price: Number(price),
        category,
        image,
      });

      alert("✅ Product Added Successfully!");
      navigate('/');
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Failed to add product. Make sure you are logged in.";
      alert("❌ Error: " + errorMsg);
      
      if (error.response?.status === 401) {
        navigate('/login'); 
      }
    }
  };

  return (
    <main className="container">
      <div className="auth-card" style={{ maxWidth: '500px', margin: '40px auto' }}>
        <h2>Add New Device</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>List a new product in the store</p>
        
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Device Name (e.g. iPhone 15)" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <input 
            type="number" 
            placeholder="Price ($)" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '10px', marginBottom: '15px', borderRadius: '5px', backgroundColor: '#1a1f29', color: 'white', border: '1px solid #2d3748' }}>
            <option value="Phones">Phones</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Watches">Watches</option>
          </select>
          <input 
            type="text" 
            placeholder="Image URL" 
            value={image} 
            onChange={(e) => setImage(e.target.value)} 
            required 
          />
          <button type="submit" className="btn">Post Product</button>
        </form>
      </div>
    </main>
  );
};

export default AddProduct;