import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl mb-8">Welcome to the App</h1>
      <div>
        <Link to="/login" className="mr-4 px-4 py-2 bg-blue-500 text-white rounded">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white rounded">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
