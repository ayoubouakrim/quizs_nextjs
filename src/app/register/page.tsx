'use client';

import { useAuth } from '@/security/service/AuthContext';
import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    rememberMe: boolean;
    agreeTerms: boolean;
}

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        rememberMe: false,
        agreeTerms: false
    });
    const {login, register} = useAuth()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await login(formData.email, formData.password)
    window.location.href = '/dashboard'
  } catch (error) {
    alert('Login failed')
  }
}

const handleRegister = async (e: React.FormEvent) => {
  e.preventDefault()
  try {
    await register(formData.name, formData.email, formData.password)
    window.location.href = '/dashboard'
  } catch (error) {
    alert('Registration failed')
  }
}
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex">
            {/* Left Column - Vector Illustration */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
                <div className="flex items-center justify-center w-full p-12 relative z-10">
                    <svg
                        viewBox="0 0 400 300"
                        className="w-full h-full max-w-lg"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Enhanced Background elements */}
                        <defs>
                            {/* Modern gradients */}
                            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                                <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.9" />
                            </linearGradient>
                            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
                                <stop offset="50%" stopColor="#ef4444" stopOpacity="0.9" />
                                <stop offset="100%" stopColor="#ec4899" stopOpacity="0.8" />
                            </linearGradient>
                            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#1e293b" />
                                <stop offset="100%" stopColor="#334155" />
                            </linearGradient>
                            <linearGradient id="buttonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#10b981" />
                                <stop offset="100%" stopColor="#059669" />
                            </linearGradient>

                            {/* Glow filter */}
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>

                            {/* Drop shadow */}
                            <filter id="dropshadow">
                                <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                            </filter>
                        </defs>

                        {/* Animated background orbs */}
                        <circle cx="60" cy="60" r="25" fill="url(#grad1)" opacity="0.1">
                            <animate attributeName="r" values="25;35;25" dur="4s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="340" cy="70" r="30" fill="url(#grad2)" opacity="0.1">
                            <animate attributeName="r" values="30;40;30" dur="5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.1;0.15;0.1" dur="5s" repeatCount="indefinite" />
                        </circle>

                        {/* Enhanced floating geometric shapes */}
                        <circle cx="50" cy="50" r="8" fill="url(#grad1)" opacity="0.8" filter="url(#glow)">
                            <animate attributeName="cy" values="50;35;50" dur="3s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                        </circle>

                        <circle cx="350" cy="80" r="12" fill="url(#grad2)" opacity="0.6" filter="url(#glow)">
                            <animate attributeName="cy" values="80;65;80" dur="4s" repeatCount="indefinite" />
                            <animate attributeName="cx" values="350;345;350" dur="4s" repeatCount="indefinite" />
                        </circle>

                        <rect x="320" y="200" width="15" height="15" fill="url(#grad1)" opacity="0.7" rx="3" filter="url(#glow)">
                            <animateTransform attributeName="transform" values="rotate(0 327 207);rotate(180 327 207);rotate(360 327 207)" dur="8s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite" />
                        </rect>

                        <polygon points="30,220 45,200 60,220 45,240" fill="url(#grad2)" opacity="0.6" filter="url(#glow)">
                            <animateTransform attributeName="transform" values="rotate(0 45 220);rotate(120 45 220);rotate(240 45 220);rotate(360 45 220)" dur="10s" repeatCount="indefinite" />
                        </polygon>

                        {/* Enhanced Main illustration - Person with laptop */}
                        <g>
                            {/* Laptop base with better styling */}
                            <rect x="150" y="180" width="100" height="60" rx="8" fill="#374151" stroke="#6b7280" strokeWidth="2" filter="url(#dropshadow)" />
                            <rect x="155" y="185" width="90" height="45" rx="4" fill="#1f2937" />

                            {/* Keyboard details */}
                            <rect x="160" y="190" width="80" height="35" rx="2" fill="#111827" />
                            {Array.from({ length: 24 }).map((_, i) => (
                                <rect key={i} x={165 + (i % 8) * 9} y={195 + Math.floor(i / 8) * 8} width="6" height="5" rx="1" fill="#374151" />
                            ))}

                            {/* Laptop screen with enhanced design */}
                            <rect x="170" y="115" width="60" height="70" rx="6" fill="#374151" stroke="#6b7280" strokeWidth="2" filter="url(#dropshadow)" />
                            <rect x="175" y="120" width="50" height="55" rx="3" fill="url(#screenGrad)" />

                            {/* Modern login interface mockup */}
                            <circle cx="200" cy="135" r="8" fill="url(#grad1)" opacity="0.9" />
                            <rect x="185" y="148" width="30" height="2" rx="1" fill="#e5e7eb" />
                            <rect x="185" y="153" width="25" height="2" rx="1" fill="#9ca3af" />
                            <rect x="185" y="160" width="30" height="2" rx="1" fill="#e5e7eb" />
                            <rect x="185" y="165" width="35" height="2" rx="1" fill="#9ca3af" />
                            <rect x="185" y="172" width="30" height="6" rx="3" fill="url(#buttonGrad)">
                                <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                            </rect>
                        </g>

                        {/* Enhanced Person silhouette */}
                        <g filter="url(#dropshadow)">
                            {/* Head with better gradient */}
                            <circle cx="200" cy="95" r="18" fill="url(#grad1)" opacity="0.9" />
                            <circle cx="200" cy="95" r="15" fill="url(#grad2)" opacity="0.3" />

                            {/* Body with modern styling */}
                            <rect x="188" y="113" width="24" height="40" rx="12" fill="url(#grad1)" opacity="0.8" />

                            {/* Arms with better positioning */}
                            <ellipse cx="175" cy="130" rx="8" ry="5" fill="url(#grad1)" opacity="0.8" transform="rotate(-15 175 130)" />
                            <ellipse cx="225" cy="130" rx="8" ry="5" fill="url(#grad1)" opacity="0.8" transform="rotate(15 225 130)" />
                        </g>

                        {/* Enhanced floating UI elements */}
                        <g opacity="0.8">
                            <rect x="75" y="120" width="45" height="30" rx="8" fill="url(#grad1)" opacity="0.2" filter="url(#glow)">
                                <animate attributeName="y" values="120;105;120" dur="4s" repeatCount="indefinite" />
                            </rect>
                            <rect x="80" y="127" width="35" height="3" rx="1" fill="#ffffff" opacity="0.9" />
                            <rect x="80" y="133" width="28" height="2" rx="1" fill="#ffffff" opacity="0.7" />
                            <rect x="80" y="138" width="20" height="6" rx="3" fill="#10b981" opacity="0.9">
                                <animate attributeName="width" values="20;25;20" dur="3s" repeatCount="indefinite" />
                            </rect>
                        </g>

                        <g opacity="0.8">
                            <rect x="275" y="140" width="40" height="25" rx="6" fill="url(#grad2)" opacity="0.2" filter="url(#glow)">
                                <animate attributeName="y" values="140;125;140" dur="5s" repeatCount="indefinite" />
                            </rect>
                            <circle cx="285" cy="150" r="4" fill="#ffffff" opacity="0.9">
                                <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="295" cy="150" r="4" fill="#ffffff" opacity="0.7">
                                <animate attributeName="opacity" values="0.7;0.3;0.7" dur="2s" repeatCount="indefinite" begin="0.5s" />
                            </circle>
                            <circle cx="305" cy="150" r="4" fill="#ffffff" opacity="0.5">
                                <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
                            </circle>
                        </g>

                        {/* Enhanced Security shield icon */}
                        <g transform="translate(315, 45)" filter="url(#glow)">
                            <path d="M0 15 L12 0 L24 15 L20 35 L4 35 Z" fill="url(#grad1)" opacity="0.9">
                                <animate attributeName="opacity" values="0.9;1;0.9" dur="2s" repeatCount="indefinite" />
                            </path>
                            <path d="M0 15 L12 0 L24 15 L20 35 L4 35 Z" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                            <path d="M7 18 L11 22 L17 12" stroke="#ffffff" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <animate attributeName="stroke-dasharray" values="0,20;20,0;20,0" dur="3s" repeatCount="indefinite" />
                                <animate attributeName="stroke-dashoffset" values="20;0;0" dur="3s" repeatCount="indefinite" />
                            </path>
                        </g>

                        {/* Additional decorative elements */}
                        <circle cx="100" cy="250" r="3" fill="url(#grad2)" opacity="0.6">
                            <animate attributeName="r" values="3;6;3" dur="6s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.6;0.2;0.6" dur="6s" repeatCount="indefinite" />
                        </circle>

                        <circle cx="300" cy="260" r="4" fill="url(#grad1)" opacity="0.5">
                            <animate attributeName="cy" values="260;250;260" dur="7s" repeatCount="indefinite" />
                            <animate attributeName="opacity" values="0.5;0.8;0.5" dur="7s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                </div>

                {/* Enhanced decorative text */}
                <div className="absolute bottom-12 left-12 text-white">
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Welcome to Our Platform
                    </h2>
                    <p className="text-lg opacity-90 text-gray-200">
                        Secure, fast, and user-friendly authentication
                    </p>
                </div>
            </div>

            {/* Right Column - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl mb-6">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-600">
                            {isLogin ? 'Sign in to your account' : 'Join us today and get started'}
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleRegister} className="space-y-6">
                        {/* Name field for registration */}
                        {!isLogin && (
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        placeholder="Enter your full name"
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Email field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter your email"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember me / Terms */}
                        <div className="space-y-4">
                            {isLogin ? (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                    <button type="button" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">
                                        Forgot password?
                                    </button>
                                </div>
                            ) : (
                                <label className="flex items-start">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded mt-1"
                                        required
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        I agree to the{' '}
                                        <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Terms of Service</a>
                                        {' '}and{' '}
                                        <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">Privacy Policy</a>
                                    </span>
                                </label>
                            )}
                        </div>

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold
                         hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                         transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social login */}
                    <button
                        type="button"
                        className="w-full bg-white border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium
                       hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                       transition-colors duration-200 flex items-center justify-center space-x-2"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Continue with Google</span>
                    </button>

                    {/* Switch form */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-indigo-600 hover:text-indigo-500 font-semibold"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;