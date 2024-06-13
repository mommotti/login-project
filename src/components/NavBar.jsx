import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const NavBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <nav className="bg-blue-500 p-4 flex justify-end">
      {isAuthenticated ? (
        <button onClick={logout} className="ml-4">
          Log Out
        </button>
      ) : (
        <>
          <Link to="/login" className="ml-4  text-white">Login</Link>
          <Link to="/register" className="ml-4  text-white">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavBar;
