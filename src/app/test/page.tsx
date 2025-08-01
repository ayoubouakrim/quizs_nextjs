'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, Plus, Search, Menu, Star, ChevronRight, Bell, User, Volume2, VolumeX, TrendingUp, Award, Sparkles, Zap, Crown } from 'lucide-react';

export default function RefinedMovieSite() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMuted, setIsMuted] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const heroRef = useRef(null);

    const featuredContent = [
        {
            title: "Back to the Beginning: Ozzy's Final Bow",
            subtitle: "Streaming Now",
            description: "A powerful return to roots, this concert captures Black Sabbath in peak form - reuniting to deliver classic hits with raw energy and legendary precision.",
            image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop",
            year: "2024",
            rating: "9.2"
        },
        {
            title: "The Dark Knight Returns",
            subtitle: "Featured",
            description: "When Gotham faces its greatest threat, an aging Batman must come out of retirement to face a brutal new enemy and confront his own mortality.",
            image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&h=1080&fit=crop",
            year: "2024",
            rating: "8.8"
        }
    ];

    const trendingMovies = [
        { title: "Happy Gilmore 2", year: "2025", rating: "7.8", image: "https://images.unsplash.com/photo-1489599317926-c9d5be220f09?w=300&h=450&fit=crop", trending: true },
        { title: "The Fantastic Four: First Steps", year: "2025", rating: "8.2", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", hot: true },
        { title: "Lilo & Stitch", year: "2025", rating: "7.5", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300&h=450&fit=crop" },
        { title: "Superman", year: "2025", rating: "8.9", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", featured: true },
        { title: "How to Train Your Dragon", year: "2025", rating: "8.1", image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop" },
        { title: "Mission: Impossible 8", year: "2025", rating: "8.7", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c72a?w=300&h=450&fit=crop", premium: true }
    ];

    const streamingRows = [
        {
            title: "Popular on CineStream",
            icon: <TrendingUp className="w-4 h-4 text-orange-500" />,
            badge: "HOT",
            movies: [
                { title: "Stranger Things 4", year: "2022", rating: "8.7", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300&h=450&fit=crop", views: "2.1M" },
                { title: "Wednesday", year: "2022", rating: "8.1", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", views: "1.8M" },
                { title: "The Crown", year: "2023", rating: "8.6", image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop", views: "1.5M" },
                { title: "House of Dragon", year: "2022", rating: "8.5", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c72a?w=300&h=450&fit=crop", views: "1.9M" },
                { title: "Ozark", year: "2022", rating: "8.4", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", views: "1.3M" },
                { title: "Squid Game", year: "2021", rating: "8.0", image: "https://images.unsplash.com/photo-1489599317926-c9d5be220f09?w=300&h=450&fit=crop", views: "2.8M" }
            ]
        },
        {
            title: "Action & Adventure",
            icon: <Zap className="w-4 h-4 text-yellow-500" />,
            badge: "NEW",
            movies: [
                { title: "John Wick 4", year: "2023", rating: "7.7", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop", duration: "2h 49m" },
                { title: "Fast X", year: "2023", rating: "5.8", image: "https://images.unsplash.com/photo-1518929458119-e5bf444c30f4?w=300&h=450&fit=crop", duration: "2h 21m" },
                { title: "Mission Impossible", year: "2023", rating: "7.7", image: "https://images.unsplash.com/photo-1509909756405-be0199881695?w=300&h=450&fit=crop", duration: "2h 43m" },
                { title: "Indiana Jones 5", year: "2023", rating: "6.5", image: "https://images.unsplash.com/photo-1520637836862-4d197d17c72a?w=300&h=450&fit=crop", duration: "2h 34m" },
                { title: "Transformers", year: "2023", rating: "6.0", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop", duration: "2h 7m" },
                { title: "The Equalizer 3", year: "2023", rating: "6.8", image: "https://images.unsplash.com/photo-1489599317926-c9d5be220f09?w=300&h=450&fit=crop", duration: "1h 49m" }
            ]
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredContent.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({
                x: (e.clientX / window.innerWidth) * 100,
                y: (e.clientY / window.innerHeight) * 100
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="bg-slate-950 text-white min-h-screen relative overflow-hidden">
            {/* Revolutionary Dynamic Background */}
            <div className="fixed inset-0 pointer-events-none z-0">




                {/* Neural Network Lines */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#9333ea" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>
                    {[...Array(6)].map((_, i) => (
                        <path
                            key={i}
                            d={`M${100 + i * 200},${50 + i * 100} Q${300 + i * 150},${200 + i * 80} ${500 + i * 100},${150 + i * 120}`}
                            stroke="url(#lineGradient)"
                            strokeWidth="1"
                            fill="none"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.5}s` }}
                        />
                    ))}
                </svg>
            </div>

            {/* Ultra Modern Header */}
            <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
                <div className="absolute inset-0 backdrop-blur-xl bg-gradient-to-r from-slate-900/70 via-slate-900/60 to-slate-900/70 border-b border-slate-700/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5" />

                <div className="relative px-4 md:px-8 py-4">
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-8">
                            {/* Futuristic Logo */}
                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500" />
                                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold tracking-widest shadow-2xl transform group-hover:scale-105 transition-all duration-300">
                                        <span className="relative z-10">CINESTREAM</span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-xl" />
                                    </div>
                                </div>
                                <Menu className="w-5 h-5 text-slate-400 hover:text-white transition-all duration-300 cursor-pointer md:hidden hover:scale-125 hover:rotate-90" />
                            </div>

                            {/* Glassmorphism Navigation */}
                            <nav className="hidden md:flex items-center space-x-1 bg-slate-800/30 backdrop-blur-sm rounded-2xl p-1 border border-slate-700/50">
                                {['Home', 'Movies', 'Series', 'Trending', 'My List'].map((item, index) => (
                                    <a key={item} href="#" className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl group ${index === 0 ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-600/20 shadow-lg' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                        <span className="relative z-10">{item}</span>
                                        {index === 0 && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl blur" />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Advanced Control Panel */}
                        <div className="flex items-center space-x-4">
                            {/* Morphing Search */}
                            <div className="relative hidden md:block group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="relative bg-slate-800/60 backdrop-blur-lg rounded-2xl border border-slate-700/50 overflow-hidden group-hover:border-blue-500/50 transition-all duration-300">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400 group-hover:text-blue-400 transition-all duration-300 group-hover:scale-110" />
                                    <input
                                        type="text"
                                        placeholder="Search the universe..."
                                        className="bg-transparent text-white pl-12 pr-4 py-3 text-sm focus:outline-none w-64 placeholder-slate-500"
                                    />
                                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                                            ⌘K
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Notification Bell with Pulse */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-all duration-300" />
                                <div className="relative bg-slate-800/60 backdrop-blur-sm p-3 rounded-full border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group-hover:scale-110">
                                    <Bell className="w-5 h-5 hover:text-blue-400 transition-colors duration-300" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse border-2 border-slate-900" />
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
                                </div>
                            </div>

                            {/* Holographic Avatar */}
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-lg opacity-60 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                                <div className="relative w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer transform group-hover:scale-110 transition-all duration-300 shadow-2xl border-2 border-white/20">
                                    <User className="w-5 h-5 text-white" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Cinematic Hero Revolution */}
            <section ref={heroRef} className="relative h-screen overflow-hidden">
                {/* Parallax Background */}
                <div
                    className="absolute inset-0 scale-110 transition-transform duration-700"
                    style={{ transform: `translateY(${scrollY * 0.5}px) scale(1.1)` }}
                >
                    <img
                        src={featuredContent[currentSlide].image}
                        alt={featuredContent[currentSlide].title}
                        className="w-full h-full object-cover transition-all duration-1000"
                    />

                    {/* Multi-layer Gradients */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/20" />
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950/60 via-transparent to-blue-950/20" />

                    {/* Cinematic Vignette */}
                    <div className="absolute inset-0" style={{
                        background: `radial-gradient(ellipse at center, transparent 20%, rgba(2, 6, 23, 0.4) 70%, rgba(2, 6, 23, 0.8) 100%)`
                    }} />
                </div>

                {/* Floating UI Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Animated Particles */}
                    {[...Array(25)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`
                            }}
                        >
                            <div className={`w-1 h-1 ${i % 4 === 0 ? 'bg-blue-400/40' : i % 4 === 1 ? 'bg-purple-400/40' : i % 4 === 2 ? 'bg-white/30' : 'bg-slate-400/20'} rounded-full blur-sm`} />
                        </div>
                    ))}

                    {/* Holographic Scan Lines */}
                    <div className="absolute inset-0 opacity-5">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse"
                                style={{
                                    top: `${i * 5}%`,
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '3s'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Hero Content with Advanced Layout */}
                <div className="relative z-10 flex items-center h-full px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="max-w-2xl transform transition-all duration-1000">
                        {/* Dynamic Badge System */}
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
                                <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-2xl border border-white/20">
                                    <span className="relative z-10 flex items-center space-x-2">
                                        <Sparkles className="w-3 h-3" />
                                        <span>{featuredContent[currentSlide].subtitle}</span>
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full" />
                                </div>
                            </div>

                            <div className="flex items-center space-x-2 bg-slate-800/60 backdrop-blur-xl px-4 py-2 rounded-full border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                                <div className="relative">
                                    <Star className="w-4 h-4 text-blue-400 fill-current group-hover:scale-125 transition-transform duration-300" />
                                    <div className="absolute inset-0 text-blue-400 animate-ping opacity-75" />
                                </div>
                                <span className="text-blue-400 font-bold text-sm">{featuredContent[currentSlide].rating}</span>
                                <div className="w-px h-4 bg-slate-600" />
                                <span className="text-slate-300 text-sm">{featuredContent[currentSlide].year}</span>
                                <Crown className="w-3 h-3 text-yellow-400" />
                            </div>
                        </div>

                        {/* Spectacular Title */}
                        <h1 className="text-2xl md:text-2xl font-black mb-6 leading-tight relative">
                            <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                {featuredContent[currentSlide].title}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent blur-sm opacity-50 animate-pulse" />
                        </h1>

                        {/* Enhanced Description */}
                        <p className="text-lg md:text-lg mb-8 leading-relaxed text-slate-300 font-light max-w-xl">
                            {featuredContent[currentSlide].description}
                        </p>

                        {/* Revolutionary Action Buttons */}
                        <div className="flex items-center space-x-4 mb-8">
                            <button className="relative group overflow-hidden bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 flex items-center space-x-3 shadow-2xl hover:shadow-white/20 transform hover:scale-105">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <Play className="relative z-10 w-5 h-5 fill-current group-hover:text-white transition-colors duration-300 group-hover:scale-110" />
                                <span className="relative z-10 group-hover:text-white transition-colors duration-300">Watch Now</span>
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </button>

                            <button className="relative group bg-slate-800/60 backdrop-blur-xl text-white px-8 py-4 rounded-2xl font-bold text-sm transition-all duration-500 flex items-center space-x-3 border border-slate-600/50 hover:border-blue-500/50 transform hover:scale-105 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                <Plus className="relative z-10 w-5 h-5 group-hover:scale-125 group-hover:rotate-90 transition-all duration-300" />
                                <span className="relative z-10">Add to List</span>
                            </button>

                            <button
                                className="relative group bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 p-4 rounded-2xl hover:border-blue-500/50 transition-all duration-500 transform hover:scale-105 overflow-hidden"
                                onClick={() => setIsMuted(!isMuted)}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                {isMuted ?
                                    <VolumeX className="relative z-10 w-5 h-5 group-hover:scale-125 transition-all duration-300" /> :
                                    <Volume2 className="relative z-10 w-5 h-5 group-hover:scale-125 transition-all duration-300" />
                                }
                            </button>
                        </div>

                        {/* Advanced Info Panel */}
                        <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/30">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-slate-300">Live</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/30">
                                <TrendingUp className="w-3 h-3 text-blue-400" />
                                <span className="text-slate-300">2.1M watching</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-slate-800/40 backdrop-blur-sm px-3 py-2 rounded-lg border border-slate-700/30">
                                <Award className="w-3 h-3 text-yellow-400" />
                                <span className="text-slate-300">4K Ultra HD</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Futuristic Slide Navigation */}
                <div className="absolute bottom-8 right-8 flex flex-col space-y-3">
                    {featuredContent.map((_, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer group"
                            onClick={() => setCurrentSlide(index)}
                        >
                            <div className={`relative transition-all duration-700 ${index === currentSlide ? 'w-2 h-12' : 'w-2 h-8 hover:h-10'
                                }`}>
                                <div className={`absolute inset-0 rounded-full transition-all duration-700 ${index === currentSlide
                                    ? 'bg-gradient-to-b from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-600 group-hover:bg-slate-400'
                                    }`} />
                                {index === currentSlide && (
                                    <>
                                        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full blur-lg opacity-60" />
                                        <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
                                    </>
                                )}
                            </div>
                            <div className="absolute -left-16 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <div className="bg-slate-800/90 backdrop-blur-sm text-white px-2 py-1 rounded text-xs whitespace-nowrap border border-slate-700/50">
                                    Slide {index + 1}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Revolutionary Trending Section */}
            <section className="relative z-20 px-4 md:px-8 pb-16 max-w-7xl mx-auto">
                <div className="bg-gradient-to-b from-slate-900/60 to-slate-950 backdrop-blur-xl rounded-3xl border border-slate-700/30 overflow-hidden shadow-2xl">
                    <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center space-x-4">
                                <div className="relative">
                                    <h2 className="text-2xl md:text-2xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                                        Trending Now
                                    </h2>
                                    <div className="absolute inset-0 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent blur-sm opacity-50" />
                                </div>
                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
                                    Live
                                </div>
                            </div>
                            <ChevronRight className="w-6 h-6 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-125 hover:rotate-90" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                            {trendingMovies.map((movie, index) => (
                                <div key={index} className="relative group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:z-10">
                                    <div className="relative overflow-hidden rounded-2xl bg-slate-800 border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full aspect-[2/3] object-cover transition-all duration-700 group-hover:scale-110"
                                        />

                                        {/* Dynamic Overlays */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                        {/* Status Badges */}
                                        <div className="absolute top-2 left-2 flex flex-col space-y-1">
                                            {movie.trending && (
                                                <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 animate-pulse">
                                                    <TrendingUp className="w-3 h-3" />
                                                    <span>HOT</span>
                                                </div>
                                            )}
                                            {movie.hot && (
                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                                    <Zap className="w-3 h-3" />
                                                    <span>NEW</span>
                                                </div>
                                            )}
                                            {movie.featured && (
                                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                                    <Crown className="w-3 h-3" />
                                                    <span>FEATURED</span>
                                                </div>
                                            )}
                                            {movie.premium && (
                                                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                                    <Sparkles className="w-3 h-3" />
                                                    <span>PREMIUM</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Rating Badge */}
                                        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1 border border-slate-700/50">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span>{movie.rating}</span>
                                        </div>

                                        {/* Hover Play Button */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-60 animate-pulse" />
                                                <div className="relative bg-white text-slate-950 p-4 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                                                    <Play className="w-6 h-6 fill-current" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Movie Info */}
                                    <div className="mt-3 px-1">
                                        <h3 className="font-bold text-sm text-white truncate group-hover:text-blue-400 transition-colors duration-300">{movie.title}</h3>
                                        <p className="text-slate-400 text-xs mt-1">{movie.year}</p>
                                    </div>

                                    {/* Hover Tooltip */}
                                    <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none z-20">
                                        <div className="bg-slate-800/95 backdrop-blur-sm text-white p-3 rounded-xl border border-slate-700/50 text-xs whitespace-nowrap shadow-2xl">
                                            <div className="font-bold">{movie.title}</div>
                                            <div className="text-slate-400 mt-1">{movie.year} • ⭐ {movie.rating}</div>
                                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45 border-b border-r border-slate-700/50" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Advanced Streaming Rows */}
            <style>{`
    .hide-scrollbar {
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        scrollbar-width: none;  /* Firefox */
    }
    .hide-scrollbar::-webkit-scrollbar {
        display: none;  /* Safari and Chrome */
    }
`}</style>
            <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto space-y-12">
                {streamingRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-3">
                                    {row.icon}
                                    <h3 className="text-2xl font-bold text-white">{row.title}</h3>
                                    <div className={`px-2 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${row.badge === 'HOT'
                                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white animate-pulse'
                                        : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                        }`}>
                                        {row.badge}
                                    </div>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer hover:scale-125" />
                        </div>

                        <div className="flex space-x-4 overflow-x-auto hide-scrollbar pb-4">
                            {row.movies.map((movie, index) => (
                                <div key={index} className="flex-shrink-0 w-48 group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-xl bg-slate-800 border border-slate-700/50 group-hover:border-blue-500/50 transition-all duration-300 transform group-hover:scale-105">
                                        <img
                                            src={movie.image}
                                            alt={movie.title}
                                            className="w-full aspect-[2/3] object-cover transition-all duration-500 group-hover:scale-110"
                                        />

                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                                        <div className="absolute top-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center space-x-1">
                                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                            <span>{movie.rating}</span>
                                        </div>

                                        {movie.views && (
                                            <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                                                {movie.views} views
                                            </div>
                                        )}

                                        {movie.duration && (
                                            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-xs">
                                                {movie.duration}
                                            </div>
                                        )}

                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                                            <div className="bg-white text-slate-950 p-3 rounded-full shadow-2xl transform group-hover:scale-110 transition-all duration-300">
                                                <Play className="w-5 h-5 fill-current" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3">
                                        <h4 className="font-semibold text-white text-sm truncate group-hover:text-blue-400 transition-colors duration-300">{movie.title}</h4>
                                        <p className="text-slate-400 text-xs mt-1">{movie.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </section>

            {/* Simple Footer */}
            <footer className="bg-slate-900 border-t border-slate-800 mt-20">
                <div className="px-4 py-8 max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-3">
                            <div className="bg-blue-600 text-white px-3 py-1 rounded font-bold text-sm">
                                CINESTREAM
                            </div>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-slate-400">
                            <a href="#" className="hover:text-white">Movies</a>
                            <a href="#" className="hover:text-white">TV Shows</a>
                            <a href="#" className="hover:text-white">Support</a>
                            <a href="#" className="hover:text-white">Privacy</a>
                        </div>
                    </div>

                    <div className="border-t border-slate-800 mt-6 pt-6 text-center">
                        <p className="text-slate-400 text-sm">© 2025 CineStream. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}