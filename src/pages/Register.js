import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', employeeId: '', department: '', floor: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registered successfully!');
      navigate('/login');
    } catch (err) {
      alert(err.response.data.msg || 'Error');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary">Employee Register</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        {['name','employeeId','department','floor','password'].map((field) => (
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
        <button className="btn btn-primary w-100" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
