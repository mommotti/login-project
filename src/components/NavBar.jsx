import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-white text-xl font-bold">CRUD APP WITH LOGIN</h1>
      </div>
      {isAuthenticated ? (
        <button onClick={logout} className="text-white ml-4">
          Log Out
        </button>
      ) : (
        <div className="flex">
          <Link to="/login" className="ml-4 text-white  hover:text-white ">Login</Link>
          <Link to="/register" className="ml-4 text-white  hover:text-white ">Register</Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
