import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';

const MyBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [userId, setUserId] = useState(null);

  // Get userId on mount
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // Fetch blogs only when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`/api/blogs/user/${userId}`);
        setBlogs(res.data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      }
    };

    fetchBlogs();
  }, [userId]);

  const handleEdit = (id) => {
    if (!id) return;
    navigate(`/blog-edit/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (confirmDelete) {
      try {
        await axios.delete(`/api/blogs/${id}`);
        setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">My Blogs</h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.length === 0 ? (
            <p className="text-gray-600 col-span-full text-center">No blogs found.</p>
          ) : (
            blogs
              .filter((blog) => blog && blog._id) // only render valid blogs
              .map((blog) => (
                <div
                  key={blog._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-100 hover:shadow-lg transition"
                  onClick={() => navigate(`/blog-list/${blog._id}`)}
                >
                  <img
                    // src={`http://localhost:5000${blog.image}`}
                    src={`https://blogwebsite-backend-pabe.onrender.com${blog.image}`}
                    alt={blog.title || 'Blog'}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold text-gray-800 mb-1">{blog.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm line-clamp-2">{blog.excerpt}</p>
                    <div className="mt-4 flex justify-end gap-3 ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(blog._id);
                        }}
                        className="text-white bg-indigo-500 p-2 rounded-lg text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(blog._id);
                        }}
                        className="text-white bg-red-600 p-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MyBlogs;
