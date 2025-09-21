import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(()=>{
    const fetchOrders = async () => {
      const res = await axios.get(`http://localhost:5000/api/orders/${user._id}`);
      setOrders(res.data);
    };
    fetchOrders();
  }, [user._id]);

  return (
    <div className="container mt-4">
      <h3 className="text-center text-secondary">Your Order History</h3>
      <ul className="list-group mt-3">
        {orders.map(order=>(
          <li key={order._id} className="list-group-item">
            {order.items.map(i=>i.name).join(', ')} | {new Date(order.date).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
