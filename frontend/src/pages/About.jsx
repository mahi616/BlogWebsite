import React from 'react';
import { Users, Target, Heart, Award } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export function About() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role')

    const writeBlog = () => {
        role ? navigate('/blog-create') : navigate('/login')
    }

    const ExplorePost = () => {
        navigate('/blog-list')
    }


    return (
        <div>
            <Header />
            <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ModernBlog</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        We're passionate about sharing knowledge, inspiring creativity, and building a community
                        of learners and creators who want to make a difference in the digital world.
                    </p>
                </section>

                {/* Mission Section */}
                <section className="mb-16">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                At ModernBlog, we believe that knowledge should be accessible to everyone. Our mission is to
                                create a platform where writers, developers, designers, and thinkers can share their insights,
                                experiences, and expertise with a global audience.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We're committed to fostering a community that values quality content, meaningful discussions,
                                and continuous learning. Whether you're a seasoned professional or just starting your journey,
                                there's a place for you here.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="Team collaboration"
                                className="rounded-2xl shadow-lg"
                            />
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: <Users className="w-8 h-8" />,
                                title: "Community",
                                description: "Building connections and fostering collaboration among creators and learners."
                            },
                            {
                                icon: <Target className="w-8 h-8" />,
                                title: "Quality",
                                description: "Maintaining high standards for content and user experience across our platform."
                            },
                            {
                                icon: <Heart className="w-8 h-8" />,
                                title: "Passion",
                                description: "Driven by genuine enthusiasm for sharing knowledge and inspiring others."
                            },
                            {
                                icon: <Award className="w-8 h-8" />,
                                title: "Excellence",
                                description: "Striving for continuous improvement and innovation in everything we do."
                            }
                        ].map((value, index) => (
                            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-xl mb-4">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Founder & Editor-in-Chief",
                                bio: "Passionate about technology and writing, Sarah founded ModernBlog to create a space for meaningful content.",
                                image: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400"
                            },
                            {
                                name: "Michael Chen",
                                role: "Technical Lead",
                                bio: "Full-stack developer with expertise in modern web technologies and a love for clean, efficient code.",
                                image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400"
                            },
                            {
                                name: "Emily Rodriguez",
                                role: "Content Strategist",
                                bio: "Experienced content creator who helps authors craft compelling stories and reach their audience.",
                                image: "https://images.pexels.com/photos/3184340/pexels-photo-3184340.jpeg?auto=compress&cs=tinysrgb&w=400"
                            }
                        ].map((member, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                                <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
                    <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                        Ready to share your story or learn from others? Join thousands of writers and readers
                        who are part of the ModernBlog community.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
                            onClick={()=>writeBlog()}
                        >
                            Start Writing
                        </button>
                        <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                            onClick={() => ExplorePost()}
                        >
                            Explore Posts
                        </button>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}