import React, { useState } from 'react';
import axios from 'axios';

const ProfileEdit = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [form, setForm] = useState({ name: user.name, department: user.department, floor: user.floor });
  const [file, setFile] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleFile = e => setFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', form.name);
    data.append('department', form.department);
    data.append('floor', form.floor);
    if(file) data.append('profileImage', file);

    try {
      await axios.put(`http://localhost:5000/api/auth/${user._id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
      alert('Profile updated!');
      localStorage.setItem('user', JSON.stringify({...user, ...form}));
    } catch(err){
      alert('Error updating profile');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center text-warning">Edit Profile</h3>
      <form onSubmit={handleSubmit} className="mt-3">
        {['name','department','floor'].map(field=>(
          <div className="mb-3" key={field}>
            <input type="text" className="form-control" name={field} value={form[field]} onChange={handleChange} required/>
          </div>
        ))}
        <div className="mb-3">
          <input type="file" className="form-control" onChange={handleFile}/>
        </div>
        <button className="btn btn-warning w-100" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default ProfileEdit;
