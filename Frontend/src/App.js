import React, { useContext } from 'react';
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
import SearchResults from './components/SearchResults';
import ManageProducts from './components/ManageProducts';
import { AuthContext } from './context/AuthContext'; // Import AuthContext
import './index.css';

function App() {
  const { user } = useContext(AuthContext); // Access user from AuthContext
 console.log(user);
  return (
    <Router>
      <CartProvider> {/* Wrap your routes with CartProvider */}
        <div className="flex flex-col min-h-screen"> {/* Flex container for content + footer */}
          <Header />
          <main className="flex-grow"> {/* Main content area that grows */}
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegistrationPage />} />
              <Route path="/product/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/search-results"element={<SearchResults/>} />
       
              {user && user.isAdmin && ( // Render AdminPage only if user is logged in and isAdmin is true
                <Route path="/admin" element={<AdminPage />} />
                
              )}
              {user && user.isAdmin && ( // Render AdminPage only if user is logged in and isAdmin is true
              <Route path="/manage-products" element={<ManageProducts />} />
                
              )}
              <Route path="/" element={<Products />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
