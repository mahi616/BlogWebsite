

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
    formData.append('image', form.image); // ⬅ file object
    formData.append('author',userId)

    try {
      const res = await axios.post('http://localhost:5000/api/blogs/create', formData); // NO HEADERS HERE
      alert('Blog created successfully!');
      navigate('/my-blogs');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to create blog');
    }
  };



  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create New Blog</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Excerpt</label>
            <textarea
              name="excerpt"
              value={form.excerpt}
              onChange={handleChange}
              rows="2"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Short description"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Content</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              rows="6"
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Image</label>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400 transition"
              onClick={() => document.getElementById('imageUpload').click()}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="mx-auto w-full h-48 object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-500">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>
                  <p className="mt-2">Click to upload or drag & drop an image</p>
                  <p className="text-sm text-gray-400">PNG, JPG, JPEG (max 2MB)</p>
                </div>
              )}
            </div>

            <input
              id="imageUpload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
          </div>


          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Publish Blog
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlog;
