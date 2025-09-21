import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [items, setItems] = useState([]);
  const [cutOff, setCutOff] = useState('');
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  useEffect(()=>{
    const fetchData = async () => {
      const resItems = await axios.get('http://localhost:5000/api/items');
      setItems(resItems.data);

      const resCutOff = await axios.get('http://localhost:5000/api/admin/cutoff');
      setCutOff(resCutOff.data.cutOffTime);
    };
    fetchData();
  }, []);

  const handleOrder = (itemId) => {
    const now = new Date();
    const [hour, minute] = cutOff.split(':');
    const cutOffTime = new Date();
    cutOffTime.setHours(hour, minute, 0);

    if(now > cutOffTime){
      alert('Ordering closed for today!');
      return;
    }
    navigate('/confirm-order', { state: { itemId } });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center text-info">Hello, {user.name} | Floor: {user.floor}</h2>
      <p className="text-center text-danger">Today's Order Cut-Off: {cutOff}</p>
      <div className="row">
        {items.map(item=>(
          <div className="col-md-4 mb-3" key={item._id}>
            <div className="card h-100 shadow-sm">
              <img src={`http://localhost:5000/${item.image}`} className="card-img-top" alt={item.name} style={{height:'200px', objectFit:'cover'}} />
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <button className="btn btn-primary mt-2" onClick={()=>handleOrder(item._id)}>Order Today</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
