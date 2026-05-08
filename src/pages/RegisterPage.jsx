import React, { useState } from 'react'; // 1. استيراد useState
import axios from 'axios'; // 2. استيراد axios
import { useNavigate } from 'react-router-dom'; // اختياري: للانتقال لصفحة الدخول بعد النجاح

const RegisterPage = () => {
  // 3. تعريف الـ States لحفظ بيانات الحقول
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 4. دالة التعامل مع الإرسال
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // إرسال طلب POST للباك إند
      const response = await axios.post('https://elevo-backend.onrender.com', {
        username: fullName, 
        email: email,
        password: password
      });

      alert("✅ " + response.data.message);
      navigate('/login'); // توجيه المستخدم لصفحة تسجيل الدخول بعد النجاح
    } catch (error) {
      // عرض رسالة الخطأ القادمة من الباك إند
      alert("❌ خطأ: " + (error.response?.data?.error || "فشل التسجيل"));
    }
  };

  return (
    <main className="container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Join us to get the latest tech deals</p>
        
        {/* 5. ربط الدالة بالنموذج */}
        <form onSubmit={handleRegister}>
         
          <input 
            type="text" 
            placeholder="Full Name" 
            value={fullName}
            onChange={(e) => setFullName(e.target.value)} // تحديث الـ State عند الكتابة
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