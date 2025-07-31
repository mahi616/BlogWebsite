

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export function Home() {
  const navigate = useNavigate();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      // const res = await fetch('/api/blogs');
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/blogs`);
      const data = await res.json();

      setFeaturedPosts(data.slice(0, 3)); // First 3 as featured
      setRecentPosts(data.slice(3, 6));   // Next 3 as recent
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> ModernBlog</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insightful articles, tutorials, and stories from passionate writers and industry experts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              onClick={() => navigate('/blog-list')}
            >
              Start Reading
            </button>
            <button
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
              onClick={() => navigate('/about')}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Posts</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <article key={post.id} className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                <Link to={`/blog-list/${post.id}`} className="block">
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-blue-200">
                    <div className={`relative overflow-hidden ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}>
                      <img
                        // src={`http://localhost:5000${post.image}`}
                        src={`https://blogwebsite-backend-pabe.onrender.com${post.image}`}
                        alt={post.title}
                        className="w-full h-full object-center group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-sm font-medium">
                          Blog
                        </span>
                      </div>
                    </div>
                    <div className={`p-6 ${index === 0 ? 'lg:p-8' : ''}`}>
                      <h3 className={`font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                        {post.title}
                      </h3>
                      <p className={`text-gray-600 mb-4 leading-relaxed ${index === 0 ? 'text-lg' : ''}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>{post.author || "Unknown"}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <span className="text-blue-600 font-medium">Read</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Recent Posts */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
            <Link to="/blog-list" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors font-medium">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <article key={post.id} className="group">
                <Link to={`/blog-list/${post.id}`} className="block">
                  <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 group-hover:border-blue-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author || "Unknown"}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
