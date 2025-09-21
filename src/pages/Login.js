import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ employeeId: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/home');
    } catch (err) {
      alert(err.response.data.msg || 'Login failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-success">Employee Login</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {['employeeId','password'].map((field)=>(
          <div className="mb-3" key={field}>
            <input 
              type={field==='password'?'password':'text'} 
              className="form-control" 
              placeholder={field.charAt(0).toUpperCase()+field.slice(1)} 
              name={field} 
              value={form[field]} 
              onChange={handleChange} 
              required
            />
          </div>
        ))}
        <button className="btn btn-success w-100" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
