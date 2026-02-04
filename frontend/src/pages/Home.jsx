import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loader from '../components/Loader'; 

export function Home() {
  const navigate = useNavigate();
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true); 
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs`);
      const data = await res.json();

      setFeaturedPosts(data.slice(0, 3));
      setRecentPosts(data.slice(3, 6));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <Header />

      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section (NO loader here) */}
        <section className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Welcome to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}ModernBlog
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover insightful articles, tutorials, and stories from passionate writers and industry experts.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
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


        {loading ? (
          <Loader />
        ) : (
          <>
            {/* Featured Posts */}
            <section className="mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Featured Posts
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {featuredPosts.map((post, index) => (
                  <article
                    key={post.id}
                    className={`group cursor-pointer ${
                      index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                    }`}
                  >
                    <Link to={`/blog-list/${post.id}`}>
                      <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border">
                        <div className={`relative ${index === 0 ? 'h-64 lg:h-80' : 'h-48'}`}>
                          <img
                            src={`https://blogwebsite-backend-pabe.onrender.com${post.image}`}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center text-sm text-gray-500 space-x-4">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" /> {post.author || 'Unknown'}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(post.date).toLocaleDateString()}
                            </span>
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
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Recent Posts</h2>
                <Link to="/blog-list" className="text-blue-600 flex items-center">
                  View All <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentPosts.map((post) => (
                  <Link key={post.id} to={`/blog-list/${post.id}`}>
                    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md border">
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {post.title}
                      </h3>
                      <div className="text-sm text-gray-500 flex gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" /> {post.author || 'Unknown'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(post.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
