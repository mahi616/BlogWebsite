import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

const CreateBlog = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ ADD

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm({ ...form, image: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('excerpt', form.excerpt);
    formData.append('content', form.content);
    formData.append('image', form.image);
    formData.append('author', userId);

    try {
      setLoading(true); // ✅ START LOADER
      await axios.post(
        'https://blogwebsite-backend-pabe.onrender.com/api/blogs/create',
        formData
      );
      alert('Blog created successfully!');
      navigate('/my-blogs');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to create blog');
    } finally {
      setLoading(false); // ✅ STOP LOADER
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Blog
        </h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          {/* ---- inputs SAME AS BEFORE ---- */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading} // ✅ DISABLE
              className={`flex items-center justify-center gap-2 px-6 py-2 rounded-lg text-white transition-all
                ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}
              `}
            >
              {loading && (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {loading ? 'Publishing...' : 'Publish Blog'}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlog;
