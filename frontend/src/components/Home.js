import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlaneDeparture, FaUserPlus, FaSignInAlt } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center">
            <FaPlaneDeparture className="mr-2" /> TripAdvis
          </h1>
          <div className="space-x-4 flex">
            <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-100 flex items-center">
              <FaUserPlus className="mr-2" /> Register
            </Link>
            <Link to="/login" className="border border-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
              <FaSignInAlt className="mr-2" /> Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Plan Your Perfect Trip
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Discover amazing destinations and create unforgettable memories
        </p>
        <Link to="/register" className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700 flex items-center justify-center w-fit mx-auto">
          <FaUserPlus className="mr-2" /> Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
