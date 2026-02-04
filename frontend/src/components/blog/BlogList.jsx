import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import Loader from '../../components/Loader';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          'https://blogwebsite-backend-pabe.onrender.com/api/blogs'
        );
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const renderContent = () => {
    if (loading) {
      return <Loader />;
    }

    if (blogs.length === 0) {
      return (
        <p className="text-center text-gray-600 col-span-full">
          No blogs available.
        </p>
      );
    }

    return blogs.map((blog) => (
      <div
        key={blog.id}
        className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
        onClick={() => navigate(`/blog-list/${blog.id}`)}
      >
        <img
          src={`https://blogwebsite-backend-pabe.onrender.com${blog.image}`}
          alt={blog.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-5 flex flex-col justify-between h-full">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {blog.title}
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            {new Date(blog.date).toLocaleDateString()} · by {blog.author}
          </p>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {blog.excerpt}
          </p>
          <Link
            to={`/blog/${blog.id}`}
            className="mt-auto inline-block text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition"
            onClick={(e) => e.stopPropagation()}
          >
            Read More
          </Link>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          All Blogs
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {renderContent()}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
