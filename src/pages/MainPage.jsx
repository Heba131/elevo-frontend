import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [loading, setLoading] = useState(true);


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
      fetchProducts(); 
    } catch (error) {
      alert("❌ " + (error.response?.data?.message || "Delete failed"));
    }
  };

  const filtered = products
    .filter(item => {
      const name = item.name ? item.name.toLowerCase() : "";
      const category = item.category ? item.category.toLowerCase() : "";
      const search = searchTerm.toLowerCase();
      return name.includes(search) || category.includes(search);
    })
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="container"><h2>Loading Products...</h2></div>;

  return (
    <main className="container">
      <h1 className="page-title">Tech Store</h1>
      
    
<div style={{ 
  display: 'flex', 
  gap: '15px', 
  marginBottom: '20px', 
  alignItems: 'center',
  flexWrap: 'wrap'
}}>
  

  <div style={{ flex: 2, minWidth: '200px' }}>
    <input 
      type="text" 
      placeholder="Search by name or category..." 
      onChange={(e) => setSearchTerm(e.target.value)} 
      style={{ width: '100%', margin: 0 }}
    />
  </div>

  <div style={{ flex: 1, minWidth: '150px' }}>
    <select 
      onChange={(e) => setSortOrder(e.target.value)}
      style={{ width: '100%', margin: 0 }} 
    >
      <option value="none">Sort By Price</option>
      <option value="low">Price: Low to High</option>
      <option value="high">Price: High to Low</option>
    </select>
  </div>
</div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item._id} className="product-card"> 
              <img src={item.image} alt={item.name} className="product-img" />
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p className="product-price">${item.price}</p>
              
            
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="btn">View Details</button>
                
           
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
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
};

export default MainPage;