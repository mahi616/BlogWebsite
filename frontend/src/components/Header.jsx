import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; // Lucide icons (optional)

const Header = () => {
  const role = localStorage.getItem('role');
  const user = localStorage.getItem('user');
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    localStorage.removeItem('userId');
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 text-2xl font-bold text-indigo-600">
            <Link to="/">ModernBlog</Link>
          </div>

          {/* Hamburger button for small devices */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Links (desktop) */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/home" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
              Home
            </Link>
            <Link to="/blog-list" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
              Blogs
            </Link>
            {role ? (
              <>
                <Link to="/my-blogs" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
                  MyBlogs
                </Link>
                <Link to="/blog-create" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
                  Create Blog
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
                  About
                </Link>
                <Link to="/contact" className="text-gray-700 hover:bg-indigo-500 hover:text-white rounded-md p-2 font-medium">
                  Contact
                </Link>
              </>
            )}
          </nav>

          {/* Auth Links (desktop) */}
          <div className="hidden md:flex space-x-4">
            {user ? (
              <Link to="/" onClick={handleLogout} className="text-white bg-red-600 p-2 rounded-lg hover:bg-red-700 font-medium">
                Logout
              </Link>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 text-sm font-medium py-2">
                  Login
                </Link>
                <Link to="/register" className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link to="/home" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
              Home
            </Link>
            <Link to="/blog-list" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
              Blogs
            </Link>
            {role ? (
              <>
                <Link to="/my-blogs" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
                  MyBlogs
                </Link>
                <Link to="/blog-create" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
                  Create Blog
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
                  About
                </Link>
                <Link to="/contact" onClick={toggleMenu} className="block text-gray-700 hover:bg-indigo-500 hover:text-white p-2 rounded">
                  Contact
                </Link>
              </>
            )}
            {user ? (
              <Link to="/" onClick={handleLogout} className="block text-white bg-red-600 p-2 rounded-lg hover:bg-red-700 font-medium">
                Logout
              </Link>
            ) : (
              <>
                <Link to="/login" onClick={toggleMenu} className="block text-gray-700 hover:text-indigo-600 text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" onClick={toggleMenu} className="block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
