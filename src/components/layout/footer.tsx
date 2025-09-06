import React from 'react';
import {
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    GraduationCap,
    Heart
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                <div className="flex-shrink-0 flex items-center group">
                                    <img
                                        src="/brand/scribe-logo.png"
                                        alt="Scribe Logo"
                                        className="h-20 w-auto border rounded-3xl mr-3 group-hover:scale-105 transition-all duration-300"
                                    />

                                </div>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Transform your educational content with AI-powered tools. Create quizzes, summaries, and interactive exercises effortlessly.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Linkedin className="h-4 w-4" />
                            </a>
                            <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dashboard</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Upload Files</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">My Documents</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Generate Quiz</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Create Summary</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Build Exercises</a></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Feature Requests</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Contact</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-400">support@eduai.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-400">San Francisco, CA</span>
                            </div>
                        </div>
                        <div className="pt-4">
                            <h4 className="text-sm font-medium mb-2">Stay Updated</h4>
                            <div className="flex space-x-2">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-3 py-2 bg-gray-800 rounded-lg text-sm border border-gray-700 focus:border-blue-500 focus:outline-none"
                                />
                                <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-gray-800">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <span>&copy; 2025 EduAI. Made with</span>
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>for educators worldwide.</span>
                        </div>
                        <div className="flex space-x-6 text-sm">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;