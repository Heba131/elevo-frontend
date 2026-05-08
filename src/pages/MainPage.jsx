import React, { useState, useEffect } from 'react'; // أضفنا useEffect
import axios from 'axios'; // أضفنا axios لجلب البيانات

const MainPage = () => {
  // 1. تعريف الـ State للمنتجات كصفوفة فارغة في البداية
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('none');
  const [loading, setLoading] = useState(true); // اختيارياً: لإظهار رسالة تحميل

  // 2. جلب البيانات من الـ Backend عند فتح الصفحة
  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const response = await axios.get('https://elevo-backend.onrender.com/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // 3. الفلترة والترتيب (تستخدم الآن مصفوفة products القادمة من السيرفر)
  const filtered = products
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'low') return a.price - b.price;
      if (sortOrder === 'high') return b.price - a.price;
      return 0;
    });

  if (loading) return <div className="container"><h2>Loading Products...</h2></div>;

  return (
    <main className="container">
      <h1 className="page-title">Tech Store</h1>
      
      <div className="filters-container" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          placeholder="Search products..." 
          onChange={(e) => setSearchTerm(e.target.value)} 
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd', flex: 1 }}
        />
        <select 
          onChange={(e) => setSortOrder(e.target.value)}
          style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
        >
          <option value="none">Sort By Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      <div className="product-grid">
        {filtered.length > 0 ? (
          filtered.map(item => (
            <div key={item._id} className="product-card"> {/* استخدمنا _id لأن MongoDB تنشئه هكذا */}
              <img src={item.image} alt={item.name} className="product-img" />
              <h3>{item.name}</h3>
              <p>{item.category}</p>
              <p className="product-price">${item.price}</p>
              <button className="btn">View Details</button>
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