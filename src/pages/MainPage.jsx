import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Search and Sort whenever searchTerm, sortOrder or products change
  useEffect(() => {
    let result = [...products];

    // 1. Filter by Search
    if (searchTerm) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Sort by Price
    if (sortOrder === 'low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [searchTerm, sortOrder, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://elevo-backend.onrender.com/api/products');
      setProducts(response.data);
      setFilteredProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      const response = await axios.delete(`https://elevo-backend.onrender.com/api/products/${id}`);
      alert(response.data.message);
      fetchProducts(); 
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Delete failed"));
    }
  };

  if (loading) return <div className="container"><h2>Loading products...</h2></div>;

  return (
    <main className="container">
      <h1 className="page-title">Tech Store</h1>

     
      <div>
        <input 
          type="text" 
          placeholder="Search products..." 
          className="form-control" // Use your existing CSS class
          style={{ flex: 1, padding: '10px' }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select 
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort by Price</option>
          <option value="low">Lowest Price First</option>
          <option value="high">Highest Price First</option>
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No products found.</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(item => (
            <div key={item._id} className="product-card">
              <img src={item.image} alt={item.name} className="product-img" />
              <div className="product-info">
                <h3>{item.name}</h3>
                <p>{item.category}</p>
                <p className="product-price">${item.price}</p>
                
                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                   <button className="btn">Details</button>
                   
              
                   {user && item.createdBy && (user.id === (item.createdBy._id || item.createdBy)) && (
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