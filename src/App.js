import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import ConfirmOrder from './pages/ConfirmOrder';
import OrderHistory from './pages/OrderHistory';
import ProfileEdit from './pages/ProfileEdit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/profile" element={<ProfileEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
