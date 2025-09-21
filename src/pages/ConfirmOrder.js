import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ConfirmOrder = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleConfirm = async () => {
    try{
      await axios.post('http://localhost:5000/api/orders', { userId: user._id, items: [state.itemId] });
      alert('Order placed successfully!');
      navigate('/home');
    } catch(err){
      alert('Error placing order');
    }
  };

  return (
    <div className="container mt-5 text-center">
      <h3 className="text-primary">Confirm your order?</h3>
      <button className="btn btn-success mt-3" onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default ConfirmOrder;
