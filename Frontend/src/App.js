import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './components/Loginpage';
import RegistrationPage from './components/RegistrationPage';
import ProductDetailPage from './components/ProductDetailPage';
import Cart from './components/Cart';
import PaymentPage from './components/PaymentPage';
import Products from './components/Products';
import AdminPage from './components/AdminPage';
// Import additional pages as needed
import './index.css';


function App() {
  return (
    <Router>
     <CartProvider> {/* Wrap your routes with CartProvider */}
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path ="/admin" element={<AdminPage />} />
        <Route path="/"  element={<Products/>} />
      </Routes>
      <Footer />
      </CartProvider>
    </Router>
  );
}

export default App;
