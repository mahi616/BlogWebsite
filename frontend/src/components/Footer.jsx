import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white mt-12">
      <div className="max-w-6xl mx-auto px-6 py-10 md:flex md:items-start md:justify-between space-y-10 md:space-y-0">
        
        {/* Branding */}
        <div className="md:w-1/3 ">
          <h2 className="text-2xl text-center font-extrabold mb-2">ModernBlogs</h2>
          <p className="text-sm text-center text-indigo-100">
            Write. Share. Inspire. Your stories deserve a beautiful home.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:w-1/3 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-indigo-100">
            <li>
              <a href="/home" className="hover:text-white transition-colors">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">About</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Connect with Us */}
        <div className="md:w-1/3 text-center md:text-left">
          <h3 className="text-lg font-semibold mb-4">Connect</h3>
          <ul className="space-y-2 text-indigo-100">
            <li>
              <a href="/login" className="hover:text-white transition-colors">Login</a>
            </li>
            <li>
              <a href="/register" className="hover:text-white transition-colors">Sign Up</a>
            </li>
          </ul>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-indigo-800 text-center text-sm text-indigo-200 py-4">
        © {new Date().getFullYear()} ModernBlogs. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
