import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl mb-8">Welcome to the crud app with login
      </h1>
      <p>A simple project where it's possible to create, edit, get and delete posts.</p>
      <p>It's possible to create your own user but there is no user interaction or logic. </p>
      <p>Posts are shared with all accounts. </p>
      <div className='mt-10'>
        <Link to="/login" className="mr-4 px-4 py-2 bg-blue-500 text-white  hover:text-white  rounded">Login</Link>
        <Link to="/register" className="px-4 py-2 bg-green-500 text-white  hover:text-white rounded">Register</Link>
      </div>
    </div>
  );
};

export default LandingPage;
