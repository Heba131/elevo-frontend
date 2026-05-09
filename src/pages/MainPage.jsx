import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://elevo-backend.onrender.com/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const response = await axios.delete(`https://elevo-backend.onrender.com/api/products/${id}`);
      alert(response.data.message);
      fetchProducts();
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Delete failed"));
    }
  };

  if (loading) return <div className="container"><h2>Loading...</h2></div>;

  return (
    <main className="container">
      <h1 className="page-title">Tech Store</h1>
      <div className="product-grid">
        {products.map(item => (
          <div key={item._id} className="product-card">
            <img src={item.image} alt={item.name} className="product-img" />
            <h3>{item.name}</h3>
            <p className="product-price">${item.price}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
               <button className="btn">Details</button>
           
               <button 
                  className="btn" 
                  style={{ backgroundColor: '#ff4d4d' }} 
                  onClick={() => handleDelete(item._id)}
               >
                 Delete
               </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MainPage;