import React, { useState } from 'react'; // 1. استيراد useState
import axios from 'axios'; // 2. استيراد axios

const LoginPage = () => {
  // 3. تعريف الـ States لحفظ البريد وكلمة السر
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 4. دالة التعامل مع الدخول
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // إرسال الطلب للباك إند
      const response = await axios.post('https://elevo-backend.onrender.com', { 
        email: email, 
        password: password 
      });

      // 5. حفظ التوكن وبيانات المستخدم في المتصفح)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      alert("✅ تم تسجيل الدخول بنجاح!");
      
      // التوجيه للصفحة الرئيسية
      window.location.href = "/"; 
    } catch (error) {
      // إظهار رسالة الخطأ القادمة من السيرفر
      alert("❌ فشل الدخول: " + (error.response?.data?.message || "تأكد من بياناتك"));
    }
  };

  return (
    <main className="container">
      <div className="auth-card">
        <h2>Login to Elevo</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Enter your details to continue</p>
        
        {/* 6. ربط الدالة بالنموذج */}
        <form onSubmit={handleLogin}>
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} // تحديث الإيميل
            required 
          />

          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // تحديث الباسورد
            required 
          />

          <button type="submit" className="btn">Login</button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;