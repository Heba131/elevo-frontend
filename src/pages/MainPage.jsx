import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get current logged-in user from localStorage to check ownership for Delete button
  const user = JSON.parse(localStorage.getItem('user'));

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
      fetchProducts(); // Refresh list after deletion
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Delete failed"));
    }
  };

  if (loading) return <div className="container"><h2>Loading products...</h2></div>;

  return (
    <main className="container">
      <h1 className="page-title">Tech Store</h1>
      
      {products.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No products available yet.</p>
      ) : (
        <div className="product-grid">
          {products.map(item => (
            <div key={item._id} className="product-card">
              <img src={item.image} alt={item.name} className="product-img" />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p className="product-category" style={{ color: '#00a3ff', fontSize: '0.9rem' }}>{item.category}</p>
                <p className="product-price">${item.price}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                   <button className="btn">Details</button>
                   
                   {/* Delete button logic: Shows only if the logged-in user ID matches the creator ID */}
                   {user && item.createdBy && (user.id === item.createdBy._id || user.id === item.createdBy) && (
                     <button 
                        className="btn" 
                        style={{ backgroundColor: '#ff4d4d' }} 
                        onClick={() => handleDelete(item._id)}
                     >
                       Delete
                     </button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default MainPage;