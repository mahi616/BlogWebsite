// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 text-center px-4">
      <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
