import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Edit, Trash2, ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams(); // assume backend uses blog ID
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`);
      if (!res.ok) throw new Error('Failed to fetch post');
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !window.confirm('Are you sure you want to delete this post?')) return;

    try {
      setDeleting(true);
      const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Delete failed');
      navigate('/');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-8 w-1/3"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Post not found</h1>
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 transition-colors">
          Back to posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to posts
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{post.author || 'Anonymous'}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
              </div>

              {post.isAuthor && (
                <div className="flex items-center space-x-2">
                  <Link
                    to={`/edit/${post.id}`}
                    className="inline-flex items-center px-3 py-1 text-sm text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Link>
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="inline-flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    {deleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
