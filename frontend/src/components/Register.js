// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Register = () => {

//     return (
//         <div className="register rounded-lg shadow-lg p-6 max-w-md mx-auto mt-10">
//             <h2 className="text-2xl font-bold mb-4">Register</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group flex flex-col gap-4">
//                     <label htmlFor="name">Name</label>
//                     <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

//                     <label htmlFor="email">Email</label>
//                     <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

//                     <label htmlFor="password">Password</label>
//                     <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

//                     <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Register</button>
//                 </div>
//             </form>
//             <p className="mt-4">Already have an account? <a href="/login" className="text-blue-500 underline">Login</a></p>
//         </div>
//     );
// };

// export default Register;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaPlaneDeparture } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Registration successful! Please check your email to verify your account.');
        setFormData({ name: '', email: '', password: '' });
      } else {
        setMessage(data.message || 'Registration failed');
      }
    } catch (error) {
      setMessage('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
      {/* TripAdvis Logo */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center justify-center">
          <FaPlaneDeparture className="mr-2" /> TripAdvis
        </h1>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-center flex items-center justify-center">
    Register 
        </h2>
        
        {message && (
          <div className={`p-3 rounded mb-4 ${message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4 relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4 relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-6 relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <FaUserPlus className="mr-2" />
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-4 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
