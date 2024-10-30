// App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './component/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import ContactUs from './pages/ContactUs';
import Home from './pages/Home';
import Product from './pages/Product';
import Login from './pages/auth/Login';
import Category from './pages/category';
import CreateOrder from './pages/orders/CreateOrder';
import Order from './pages/orders/Order';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Protected routes - need login to access */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/category" element={<Category />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/order" element={<Order />} />
                        <Route path="/contactus" element={<ContactUs />} />
                        <Route path="/orders/CreateOrder" element={<CreateOrder />} />
                    </Route>

                    {/* Open route */}
                    <Route path="/auth/login" element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
