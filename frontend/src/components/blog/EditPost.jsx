import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        const blog = res.data;

        setForm({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          image: null,
        });

        setPreview(`http://localhost:5000${blog.image}`);
      } catch (err) {
        console.error('Error fetching blog:', err);
        alert('Failed to fetch blog.');
        navigate('/my-blogs');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setForm((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('excerpt', form.excerpt);
    formData.append('content', form.content);
    if (form.image) formData.append('image', form.image);

    try {
      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData);
      alert('Blog updated successfully!');
      navigate('/my-blogs');
    } catch (err) {
      console.error('Update failed:', err);
      alert('Failed to update blog.');
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Edit Blog</h1>

        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded-lg focus:ring-indigo-500"
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
              className="w-full border px-4 py-2 rounded-lg focus:ring-indigo-500"
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
              className="w-full border px-4 py-2 rounded-lg focus:ring-indigo-500"
              placeholder="Write your blog content here..."
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Image</label>
            <div
              className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-indigo-400"
              onClick={() => document.getElementById('editImageUpload').click()}
            >
              {preview ? (
                <img src={preview} alt="Preview" className="mx-auto w-full h-48 object-cover rounded-lg" />
              ) : (
                <p className="text-gray-400">Click or drag an image to upload</p>
              )}
            </div>
            <input
              id="editImageUpload"
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditBlog;
